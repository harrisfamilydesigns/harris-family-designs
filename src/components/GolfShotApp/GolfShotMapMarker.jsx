import React from 'react';
import {
  calculateDestination,
  direction,
  calculateTangentBearings,
  yardsToMeters,
  calculateBearing,
  calculateDistance,
} from 'helpers/GolfShotApp/ShotHelpers';
import {
  MarkerF,
  CircleF,
  PolylineF,
} from '@react-google-maps/api';
import { throttle } from 'lodash';

const MAX_CLUB_POWER = 1.0;

const GolfShotMapMarker = ({
  selectedClub,
  position,
  onMarkerPositionChange,
  onClubPowerChange,
  onDestinationChange
}) => {
  const [markerPosition, setMarkerPosition] = React.useState(position);
  const [destination, setDestination] = React.useState(null);
  const [bearing, setBearing] = React.useState(direction('E'));
  const [clubPower, setClubPower] = React.useState(1);

  const handleDestinationChange = (newDestination) => {
    setDestination(newDestination);
    if (onDestinationChange) onDestinationChange(newDestination);
  };

  const handleMarkerPositionChange = (newPosition) => {
    setMarkerPosition(newPosition); // Update marker position after dragging
    if (onMarkerPositionChange) onMarkerPositionChange(newPosition); // Notify parent component about the change in marker position
  };

  const handleClubPowerChange = (newClubPower) => {
    setClubPower(newClubPower);
    if (onClubPowerChange) onClubPowerChange(newClubPower);
  };

  // Allow the parent component to update the marker position
  React.useEffect(() => {
    if (position) {
      handleMarkerPositionChange(position);
      if (destination) {
        const newDestination = calculateDestination(position, selectedClub.carryDistanceYards * clubPower, bearing);
        handleDestinationChange(newDestination);
      }
    }
  }, [position]);

  // Allows the parent component to update the selected club
  React.useEffect(() => {
    if (selectedClub) {
      const newDestination = calculateDestination(markerPosition, selectedClub.carryDistanceYards * clubPower, bearing);
      handleDestinationChange(newDestination);
    }
  }, [selectedClub]);

  if (!selectedClub || !destination || !bearing) return null;

  const handleMarkerDrag = (event) => {
    // Only update if the new position is a pixel away from the current position
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    const newDestination = calculateDestination(newPosition, selectedClub.carryDistanceYards * clubPower, bearing);

    handleMarkerPositionChange(newPosition);
    handleDestinationChange(newDestination); // Update destination after dragging
    onMarkerPositionChange(newPosition); // Notify parent component about the change in marker position
  };

  const linearScaledDispersionRadius = selectedClub.dispersionRadiusYardsPlusMinus * clubPower;
  const linearScaledTotalDistanceRadius = (selectedClub.dispersionRadiusYardsPlusMinus * clubPower) + (selectedClub.totalDistanceYardsPlusMinus * clubPower);
  // Calculate tangent angles for dispersion circle
  const tangentAngle = calculateTangentBearings(selectedClub.carryDistanceYards * clubPower, linearScaledDispersionRadius);

  // Calculate the tangent points on the dispersion circle
  const tangentPoints = [
    calculateDestination(markerPosition, (selectedClub.carryDistanceYards * clubPower), bearing - tangentAngle), // Left tangent
    calculateDestination(markerPosition, (selectedClub.carryDistanceYards * clubPower), bearing + tangentAngle), // Right tangent
  ];

  const handleCircleDrag = (event) => {
    const targetDestination = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    // Calculate the new bearing based on the new destination
    const newBearing = calculateBearing(markerPosition, targetDestination);
    setBearing(newBearing);

    // if target destination is further than the club's max carry distance, set it to the max carry distance
    const calculatedDistance = calculateDistance(markerPosition, targetDestination);
    const maxDistance = selectedClub.carryDistanceYards;
    const newDestination = calculatedDistance > maxDistance ? calculateDestination(markerPosition, maxDistance, bearing) : targetDestination;

    handleDestinationChange(newDestination); // Update destination after dragging

    // Calculate the distance from marker to the new destination
    const distance = calculateDistance(markerPosition, newDestination); // Replace this with an actual distance calculation method

    // Calculate the new club power as a ratio of the dragged distance to the club's max carry distance
    const newClubPower = Math.min(MAX_CLUB_POWER, distance / selectedClub.carryDistanceYards);

    handleClubPowerChange(newClubPower);
  };

  const throttledHandleCircleDrag = throttle(handleCircleDrag, 50);

  return (
    <>
      <MarkerF position={markerPosition} draggable onDrag={handleMarkerDrag}/>
      {/* Main shot line */}
      <PolylineF
        path={[markerPosition, destination]}
        options={{
          strokeOpacity: 0,
          icons: [
            {
              icon: {
                // Dashed line
                path: 'M 0,-1 0,1',
                strokeOpacity: 1,
                scale: 4,
                strokeWeight: 2,
                strokeColor: 'chartreuse',
              },
              offset: '0',
              repeat: '20px',
            }
          ]
        }}
      />

      {/* dispersion lines */}
      {tangentPoints.map((point, index) => (
        <PolylineF
          key={index}
          path={[markerPosition, point]} // Tangent lines to the edge of the dispersion circle
          options={{
            strokeOpacity: 1,
            strokeWeight: 1,
            strokeColor: 'chartreuse', // Color for dispersion lines
          }}
        />
      ))}

      {/* Total distance circle (dispersionRadiusYardsPlusMinus + totalDistanceYardsPlusMinus) */}
      <CircleF
        center={destination}
        radius={yardsToMeters(linearScaledTotalDistanceRadius)}
        options={{
          strokeColor: 'red',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: 'red',
          fillOpacity: 0.35,
        }}
      />

      {/* Landing area circle (dispersion circle) */}
      <CircleF
        center={destination}
        radius={yardsToMeters(linearScaledDispersionRadius)}
        options={{
          strokeColor: 'chartreuse',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: 'chartreuse',
          fillOpacity: 0.35,
        }}
        draggable
        onDrag={throttledHandleCircleDrag}
      />
    </>
  )
};

export default GolfShotMapMarker;

import React from 'react';
import {
  calculateDestination,
  calculateTangentHeading,
  yardsToMeters,
  calculateDistance,
} from 'helpers/GolfShotApp/ShotHelpers';
import {
  MarkerF,
  CircleF,
  PolylineF,
} from '@react-google-maps/api';
import golfBall from 'assets/GolfShotApp/golf-ball.png';

const MAX_CLUB_POWER = 1.0;

const GolfShotMapMarker = ({
  selectedClub,
  position,
  destination: initialDestination,
  onMarkerPositionChange,
  onClubPowerChange,
  onDestinationChange,
  standardDistancesVisible,
}) => {
  const [state, setState] = React.useState({
    markerPosition: position,
    destination: null,
    heading: '0', // Heading in degrees "North is 0 degrees"
    clubPower: 1,
  });
  const {markerPosition, destination, heading, clubPower} = state;

  const [dragOffset, setDragOffset] = React.useState({
    offsetInMeters: 0,
    headingFromCenter: 0,
  });
  const {offsetInMeters, headingFromCenter} = dragOffset;

  // Allow the parent component to update the marker position
  React.useEffect(() => {
    if (position) {
      const updates = {
        markerPosition: position,
      };
      if (destination) {
        const newDestination = calculateDestination(position, selectedClub.carryDistanceYards * clubPower, heading);
        updates.destination = newDestination;
      }
      setState(prev => ({ ...prev, ...updates }));
    }
  }, [position]);

  // Allow the parent component to update the destination
  React.useEffect(() => {
    if (initialDestination) {
      const newHeading = window.google.maps.geometry.spherical.computeHeading(markerPosition, initialDestination);
      const newClubPower = calculateDistance(markerPosition, initialDestination) / (selectedClub.carryDistanceYards * MAX_CLUB_POWER);
      setState(prev => ({ ...prev, destination: initialDestination, heading: newHeading, clubPower: newClubPower }));
    }
  }, [initialDestination]);

  // Allows the parent component to update the selected club
  React.useEffect(() => {
    if (selectedClub) {
      const newDestination = calculateDestination(markerPosition, selectedClub.carryDistanceYards * clubPower, heading);
      setState(prev => ({ ...prev, destination: newDestination }));
    }
  }, [selectedClub]);

  const handleMarkerDrag = React.useCallback((event) => {
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    const newDestination = calculateDestination(newPosition, selectedClub.carryDistanceYards * clubPower, heading);

    setState(prev => ({ ...prev, markerPosition: newPosition, destination: newDestination }));
    if (onMarkerPositionChange) onMarkerPositionChange(newPosition);
    if (onDestinationChange) onDestinationChange(newDestination);
  }, [selectedClub, clubPower, heading, onMarkerPositionChange, onDestinationChange]);

  // We need to save off the offset and heading from the center of the circle when dragging starts
  // This is so we can calculate the new destination point based on the mouse position
  // instead of using the mouse position as the new destination point
  const handleCircleDragStart = (event) => {
    const mouseLatLng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    const offsetInMeters = window.google.maps.geometry.spherical.computeDistanceBetween(destination, mouseLatLng);
    const headingFromCenter = window.google.maps.geometry.spherical.computeHeading(destination, mouseLatLng);
    setDragOffset({
      offsetInMeters,
      headingFromCenter,
    });
  };

  const handleCircleDrag = React.useCallback((event) => {
    const mouseLatLng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    // Use the saved offset and heading from the center of the circle to calculate the new destination point
    // Instead of using the mouse position as the new destination point
    // mouseLatLng plus the offset in the exact opposite direction of the heading
    const functionalTargetDestination = window.google.maps.geometry.spherical.computeOffset(mouseLatLng, offsetInMeters, headingFromCenter + 180);
    const targetDestination = {
      lat: functionalTargetDestination.lat(),
      lng: functionalTargetDestination.lng(),
    }

    // Calculate the new heading based on the new destination
    const newHeading = window.google.maps.geometry.spherical.computeHeading(markerPosition, targetDestination);
    // if target destination is further than the club's max carry distance, set it to the max carry distance
    const calculatedDistance = calculateDistance(markerPosition, targetDestination);

    const maxDistance = selectedClub.carryDistanceYards * MAX_CLUB_POWER;
    const newDestination = calculatedDistance > maxDistance ? calculateDestination(markerPosition, maxDistance, newHeading) : targetDestination;
    const newClubPower = calculatedDistance > maxDistance ? MAX_CLUB_POWER : calculatedDistance / maxDistance;

    setState(prev => ({ ...prev, heading: newHeading, clubPower: newClubPower, destination: newDestination }));

    if (onDestinationChange) onDestinationChange(newDestination);
    if (onClubPowerChange) onClubPowerChange(newClubPower);
  }, [markerPosition, selectedClub, onDestinationChange, onClubPowerChange, offsetInMeters, headingFromCenter]);

  const scaledDispersionRadius = React.useMemo(() => {
    if (!selectedClub) return null;
    if (!clubPower) return null;
    return selectedClub.dispersionRadiusYardsPlusMinus * clubPower;
  }, [selectedClub, clubPower]);

  const scaledTotalDistanceRadius = React.useMemo(() => {
    if (!selectedClub) return null;
    if (!clubPower) return null;
    return scaledDispersionRadius + (selectedClub.totalDistanceYardsPlusMinus * clubPower);
  }, [selectedClub, clubPower, scaledDispersionRadius]);

  // Calculate the tangent points on the dispersion circle
  const tangentPoints = React.useMemo(() => {
    if (!selectedClub) return null;
    if (!clubPower) return null;

    // Calculate tangent angles for dispersion circle
    const tangentHeading = calculateTangentHeading(selectedClub.carryDistanceYards * clubPower, scaledDispersionRadius);

    return [
      calculateDestination(markerPosition, (selectedClub.carryDistanceYards * clubPower), heading - tangentHeading), // Left tangent
      calculateDestination(markerPosition, (selectedClub.carryDistanceYards * clubPower), heading + tangentHeading), // Right tangent
    ];
  }, [markerPosition, selectedClub, clubPower, heading, scaledDispersionRadius]);

  if (!selectedClub || !destination || !heading) return null;

  return (
    <>
      <MarkerF
        position={markerPosition}
        draggable
        onDrag={handleMarkerDrag}
      />
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

      {/* Circles for every 50yds until reaching total club distance */}
      {standardDistancesVisible && Array.from({ length: Math.ceil(selectedClub.carryDistanceYards / 50) }, (_, i) => {
          const distance = (i + 1) * 50;
          const radius = yardsToMeters(distance);
          return (
            <>
              <CircleF
                key={i}
                center={markerPosition}
                radius={radius}
                options={{
                  strokeColor: i % 2 == 0 ? 'lightgray' : 'white',
                  strokeOpacity: 0.8,
                  strokeWeight: i % 2 == 0 ? 1 : 3,
                  fillOpacity: 0,
                }}
              />
              <MarkerF
                position={calculateDestination(markerPosition, distance, 0)}
                label={{
                  text: `${distance}yd`,
                  fontSize: '16px',
                  color: i % 2 == 0 ? 'lightgray' : 'white',
                  className: 'drop-shadow',
                }}
                // No icon for the marker
                icon={{
                  url: golfBall,
                  scaledSize: new window.google.maps.Size(0, 0),
                  labelOrigin: new window.google.maps.Point(0, 10),
                }}
              />
            </>
          );
        })
      }

      {/* Total distance circle (dispersionRadiusYardsPlusMinus + totalDistanceYardsPlusMinus) */}
      <CircleF
        center={destination}
        radius={yardsToMeters(scaledTotalDistanceRadius)}
        options={{
          strokeColor: 'red',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: 'red',
          fillOpacity: 0.35,
        }}
      />

      <MarkerF
        position={destination}
        icon={{
          url: golfBall,
          scaledSize: new window.google.maps.Size(28, 28),
          anchor: new window.google.maps.Point(14, 14),
        }}
        draggable
        onDragStart={handleCircleDragStart}
        onDrag={handleCircleDrag}
        onDragEnd={handleCircleDrag}
        label={{
          text: `${Math.round(selectedClub.carryDistanceYards * clubPower)}yd`,
          fontSize: '16px',
          color: 'white',
          className: 'mb-10 drop-shadow',
        }}
      />

      {/* Landing area circle (dispersion circle) */}
      <CircleF
        center={destination}
        radius={yardsToMeters(scaledDispersionRadius)}
        options={{
          strokeColor: 'chartreuse',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: 'chartreuse',
          fillOpacity: 0.35,
          zIndex: 10,
        }}
      />
    </>
  )
};

export default React.memo(GolfShotMapMarker);

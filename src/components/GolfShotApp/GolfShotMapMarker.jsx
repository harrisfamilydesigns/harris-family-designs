import React from 'react';
import {
  calculateDestination,
  direction,
  calculateTangentBearings,
  yardsToMeters,
  calculateBearing
} from 'helpers/GolfShotApp/ShotHelpers';
import {
  MarkerF,
  CircleF,
  PolylineF,
} from '@react-google-maps/api';

const GolfShotMapMarker = ({ selectedClub, position, onMidpointChange }) => {
  const [markerPosition, setMarkerPosition] = React.useState(position);
  const [destination, setDestination] = React.useState(null);
  const [bearing, setBearing] = React.useState(direction('E'));

  React.useEffect(() => {
    if (markerPosition && selectedClub && bearing) {
      setDestination(calculateDestination(markerPosition, selectedClub.carryDistanceYards, bearing));
    }
  }, [markerPosition, selectedClub, bearing]);

  React.useEffect(() => {
    if (markerPosition && destination) {
      const midpoint = {
        lat: (markerPosition.lat + destination.lat) / 2,
        lng: (markerPosition.lng + destination.lng) / 2,
      };
      onMidpointChange(midpoint);
    }
  }, [markerPosition, destination]);

  if (!selectedClub || !destination || !bearing) return null;

  const handleMarkerDrag = (event) => {
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarkerPosition(newPosition); // Update marker position after dragging
  };

  // Calculate tangent angles for dispersion circle
  const tangentAngle = calculateTangentBearings(selectedClub.carryDistanceYards, selectedClub.dispersionRadiusYardsPlusMinus);

  // Calculate the tangent points on the dispersion circle
  const tangentPoints = [
    calculateDestination(markerPosition, selectedClub.carryDistanceYards, bearing - tangentAngle), // Left tangent
    calculateDestination(markerPosition, selectedClub.carryDistanceYards, bearing + tangentAngle), // Right tangent
  ];

  const handleCircleDrag = (event) => {
    const newDestination = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    // Calculate the new bearing based on the new destination
    const newBearing = calculateBearing(markerPosition, newDestination);
    setBearing(newBearing);
    setDestination(newDestination);
  };

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
            strokeColor: 'orange', // Color for dispersion lines
          }}
        />
      ))}

      {/* Landing area circle */}
      <CircleF
        center={destination}
        radius={yardsToMeters(selectedClub.dispersionRadiusYardsPlusMinus)} // Circle radius in meters
        options={{
          strokeColor: 'red',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: 'red',
          fillOpacity: 0.35,
        }}
        draggable
        onDrag={handleCircleDrag}
      />
    </>
  )
};

export default GolfShotMapMarker;

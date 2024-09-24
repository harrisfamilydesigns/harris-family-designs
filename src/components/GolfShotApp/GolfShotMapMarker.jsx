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
  const [state, setState] = React.useState({
    markerPosition: position,
    destination: null,
    destinationDragCenter: null,
    bearing: direction('E'),
    clubPower: 1,
  });
  const {markerPosition, destination, destinationDragCenter, bearing, clubPower} = state;

  const throttledUpdate = React.useRef(
    throttle((newState) => {
      setState(prev => ({ ...prev, ...newState }));
    }, 0) // Adjust the delay (in ms) as needed
  ).current;

  // Allow the parent component to update the marker position
  React.useEffect(() => {
    if (position) {
      const updates = {
        markerPosition: position,
      };
      if (destination) {
        const newDestination = calculateDestination(position, selectedClub.carryDistanceYards * clubPower, bearing);
        updates.destination = newDestination;
      }
      // setState(prev => ({ ...prev, ...updates }));
      throttledUpdate(updates);
    }
  }, [position]);

  // Allows the parent component to update the selected club
  React.useEffect(() => {
    if (selectedClub) {
      const newDestination = calculateDestination(markerPosition, selectedClub.carryDistanceYards * clubPower, bearing);
      // setState(prev => ({ ...prev, destination: newDestination }));
      throttledUpdate({ destination: newDestination });
    }
  }, [selectedClub]);

  const handleMarkerDrag = React.useCallback((event) => {
    // Only update if the new position is a pixel away from the current position
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    const newDestination = calculateDestination(newPosition, selectedClub.carryDistanceYards * clubPower, bearing);

    // setState(prev => ({ ...prev, markerPosition: newPosition, destination: newDestination }));
    throttledUpdate({ markerPosition: newPosition, destination: newDestination });
    if (onMarkerPositionChange) onMarkerPositionChange(newPosition);
    if (onDestinationChange) onDestinationChange(newDestination);
  }, [selectedClub, clubPower, bearing, onMarkerPositionChange, onDestinationChange]);

  const handleCircleDrag = React.useCallback((event, updateBearingOnly) => {
    // The user is dragging from some offset from the center of the circle (they likely clicked somewhere besides the exact center)
    // We want to set the targetDestination to the exact center of the circle
    const mouseDestination = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    // The destinationDragCenter may not have been set yet
    const oldCircleCenter = destinationDragCenter || destination;

    if (!oldCircleCenter) return;
    // Now we need to calculate the offset from the center of the circle to the mouse destination
    const offsetInMeters = window.google.maps.geometry.spherical.computeDistanceBetween(oldCircleCenter, mouseDestination);
    const headingFromCenter = window.google.maps.geometry.spherical.computeHeading(oldCircleCenter, mouseDestination);
    // Calculate the new target destination
    const targetDestination = calculateDestination(oldCircleCenter, offsetInMeters, headingFromCenter);

    setState(prev => ({ ...prev, destinationDragCenter: targetDestination }));
    // const offsetInMeters = window.google.maps.geometry.spherical.computeDistanceBetween(circleCenter, event.latLng);
    // const offsetInYards = metersToYards(offsetInMeters);

    // Calculate the new bearing based on the new destination
    const newBearing = calculateBearing(markerPosition, targetDestination);
    // if target destination is further than the club's max carry distance, set it to the max carry distance
    const calculatedDistance = calculateDistance(markerPosition, targetDestination);

    const maxDistance = selectedClub.carryDistanceYards * MAX_CLUB_POWER;
    const newDestination = calculatedDistance > maxDistance ? calculateDestination(markerPosition, maxDistance, newBearing) : targetDestination;
    const newClubPower = calculatedDistance > maxDistance ? MAX_CLUB_POWER : calculatedDistance / maxDistance;

    if (updateBearingOnly) {
      throttledUpdate({ bearing: newBearing, /*destination: newDestination, clubPower: newClubPower*/ });
      return;
    }
    // setState(prev => ({ ...prev, bearing: newBearing, destination: newDestination, clubPower: newClubPower }));
    throttledUpdate({ bearing: newBearing, destination: newDestination, clubPower: newClubPower });

    if (onDestinationChange) onDestinationChange(newDestination);
    if (onClubPowerChange) onClubPowerChange(newClubPower);
  }, [markerPosition, selectedClub, onDestinationChange, onClubPowerChange, destination, destinationDragCenter]);

  const linearScaledDispersionRadius = React.useMemo(() => {
    if (!selectedClub) return null;
    if (!clubPower) return null;
    return selectedClub.dispersionRadiusYardsPlusMinus * clubPower;
  }, [selectedClub, clubPower]);

  const linearScaledTotalDistanceRadius = React.useMemo(() => {
    if (!selectedClub) return null;
    if (!clubPower) return null;
    return linearScaledDispersionRadius + (selectedClub.totalDistanceYardsPlusMinus * clubPower);
  }, [selectedClub, clubPower, linearScaledDispersionRadius]);

  // Calculate the tangent points on the dispersion circle
  const tangentPoints = React.useMemo(() => {
    if (!selectedClub) return null;
    if (!clubPower) return null;

    // Calculate tangent angles for dispersion circle
    const tangentAngle = calculateTangentBearings(selectedClub.carryDistanceYards * clubPower, linearScaledDispersionRadius);

    return [
      calculateDestination(markerPosition, (selectedClub.carryDistanceYards * clubPower), bearing - tangentAngle), // Left tangent
      calculateDestination(markerPosition, (selectedClub.carryDistanceYards * clubPower), bearing + tangentAngle), // Right tangent
    ];
  }, [markerPosition, selectedClub, clubPower, bearing, linearScaledDispersionRadius]);

  if (!selectedClub || !destination || !bearing) return null;

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

      {/* Distance (yds) text at 25%, 50%, 75%, and 100% */}
      {[0.25, 0.5, 0.75, 1].map((percent, index) => {
        const distance = selectedClub.carryDistanceYards * percent;
        const point = calculateDestination(markerPosition, distance, bearing);
        return (
          <MarkerF
            key={index}
            position={point}
            label={{
              text: `${Math.round(distance)} yds (${Math.round(percent * 100)}%)`,
              color: 'white',
            }}
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/blue-pushpin.png',
            }}
          />
        );
      })}

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
        onDrag={e => handleCircleDrag(e, true)}
        onDragEnd={e => handleCircleDrag(e, false)}
      />
    </>
  )
};

export default React.memo(GolfShotMapMarker);

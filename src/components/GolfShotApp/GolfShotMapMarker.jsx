import React from 'react';
import {
  calculateBallPosition,
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
import { useClubContext } from 'providers/GolfShotApp/ClubProvider';

const MAX_CLUB_POWER = 1.0;

const GolfShotMapMarker = ({
  standardDistancesVisible,
}) => {
  const {
    selectedClub,
    markerPosition,
    setMarkerPosition,
    ballPosition,
    setBallPosition,
    heading,
    setHeading,
    clubPower,
    setClubPower
  } = useClubContext();

  const handleMarkerDrag = event => {
    const newMarkerPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    const newBallPosition = calculateBallPosition(newMarkerPosition, selectedClub.carryDistanceYards * clubPower, heading);

    setMarkerPosition(newMarkerPosition);
    setBallPosition(newBallPosition);
  }

  const handleBallDrag = event => {
    const mouseLatLng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    const targetBallPosition = mouseLatLng;

    // Calculate the new heading based on the new destination
    const newHeading = window.google.maps.geometry.spherical.computeHeading(markerPosition, targetBallPosition);
    // if target destination is further than the club's max carry distance, set it to the max carry distance
    const calculatedDistance = calculateDistance(markerPosition, targetBallPosition);
    const maxDistance = selectedClub.carryDistanceYards * MAX_CLUB_POWER;

    const newBallPosition = calculatedDistance > maxDistance ? calculateBallPosition(markerPosition, maxDistance, newHeading) : targetBallPosition;
    const newClubPower = calculatedDistance > maxDistance ? MAX_CLUB_POWER : calculatedDistance / maxDistance;

    setHeading(newHeading);
    setClubPower(newClubPower);
    setBallPosition(newBallPosition);
  };

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
      calculateBallPosition(markerPosition, (selectedClub.carryDistanceYards * clubPower), heading - tangentHeading), // Left tangent
      calculateBallPosition(markerPosition, (selectedClub.carryDistanceYards * clubPower), heading + tangentHeading), // Right tangent
    ];
  }, [markerPosition, selectedClub, clubPower, heading, scaledDispersionRadius]);

  if (!selectedClub || !ballPosition || !heading) return null;

  return (
    <>
      <MarkerF
        className="z-10"
        position={markerPosition}
        draggable
        onDrag={handleMarkerDrag}
      />
      {/* Main shot line */}
      <PolylineF
        path={[markerPosition, ballPosition]}
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
                position={calculateBallPosition(markerPosition, distance, 0)}
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
        center={ballPosition}
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
        className="z-10"
        position={ballPosition}
        icon={{
          url: golfBall,
          scaledSize: new window.google.maps.Size(28, 28),
          anchor: new window.google.maps.Point(14, 14),
        }}
        draggable
        onDrag={handleBallDrag}
        onDragEnd={handleBallDrag}
        label={{
          text: `${Math.round(selectedClub.carryDistanceYards * clubPower)}yd`,
          fontSize: '16px',
          color: 'white',
          className: 'mb-10 drop-shadow',
        }}
      />

      {/* Landing area circle (dispersion circle) */}
      <CircleF
        center={ballPosition}
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

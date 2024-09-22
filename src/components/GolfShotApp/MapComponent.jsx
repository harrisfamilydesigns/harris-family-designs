import React from 'react';
// Have to use the F suffix with React 18+
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  CircleF,
  PolylineF,
  OverlayView,
  OverlayViewF,
} from '@react-google-maps/api';
import useGeolocation from 'hooks/useGeolocation';
import { calculateDestination, direction, calculateTangentBearings, yardsToMeters, calculateBearing } from 'helpers/GolfShotApp/ShotHelpers';
import ClubSelector from './ClubSelector';
import { useGetClubs } from 'api/resources/GolfShotApp/clubs';

const MapComponent = () => {
  const { location, error, loading } = useGeolocation();
  const [map, setMap] = React.useState(null);
  const [zoomLevel, setZoomLevel] = React.useState(18);
  const [markerPosition, setMarkerPosition] = React.useState(null);
  const [destination, setDestination] = React.useState(null);
  const [bearing, setBearing] = React.useState(direction('E'));
  const { data: clubs, isLoading: clubsLoading } = useGetClubs();
  const [selectedClub, setSelectedClub] = React.useState(null);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  React.useEffect(() => {
    if (clubs && !selectedClub) setSelectedClub(clubs[0]);
  }, [clubs])

  React.useEffect(() => {
    if (location) {
      setMarkerPosition(location); // Set initial marker position to geolocation
    }
  }, [location]);

  React.useEffect(() => {
    if (markerPosition) {
      setDestination(calculateDestination(markerPosition, selectedClub.carryDistanceYards, bearing));
    }
  }, [markerPosition, selectedClub, bearing]);

  if (!isLoaded) return <p>Loading map...</p>
  if (loading || !location || !markerPosition) return <p>Fetching location...</p>;
  if (error) return <div>{error}</div>;

  const containerStyle = {
    width: '100%',
    height: '100vh',
  };

  // Calculate tangent angles for dispersion circle
  const tangentAngle = calculateTangentBearings(selectedClub.carryDistanceYards, selectedClub.dispersionRadiusYardsPlusMinus);

  // Calculate the tangent points on the dispersion circle
  const tangentPoints = [
    calculateDestination(markerPosition, selectedClub.carryDistanceYards, bearing - tangentAngle), // Left tangent
    calculateDestination(markerPosition, selectedClub.carryDistanceYards, bearing + tangentAngle), // Right tangent
  ];

  const handleMarkerDragEnd = (event) => {
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarkerPosition(newPosition); // Update marker position after dragging
  };

  const handleCircleDragEnd = (event) => {
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
    <div style={{ position: 'relative' }}>
      <ClubSelector selectedClub={selectedClub} onSelectClub={setSelectedClub} />
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={zoomLevel}
        center={location}
        mapTypeId="satellite"
        onLoad={map => setMap(map)}
      >
        <MarkerF position={markerPosition} draggable onDrag={handleMarkerDragEnd}/>

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
          onDrag={handleCircleDragEnd}
        />

        {/* Club name overlay */}
        {/* <OverlayViewF
          position={destination} // Position overlay in the center of the circle
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET} // Ensures it's clickable
        >
          <div style={{
            backgroundColor: 'white',
            borderRadius: '50%',
            padding: '5px',
            border: '2px solid black',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '14px',
            width: '40px',
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {selectedClub.name.substring(0, 2).toUpperCase()}
          </div>
        </OverlayViewF> */}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;

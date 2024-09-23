import React from 'react';
// Have to use the F suffix with React 18+
import {
  GoogleMap,
  useJsApiLoader,
} from '@react-google-maps/api';
import useGeolocation from 'hooks/useGeolocation';
import ClubSelector from './ClubSelector';
import GolfShotMapMarker from './GolfShotMapMarker';
import { Button } from 'antd';
import { CompassOutlined } from '@ant-design/icons';

const MapComponent = () => {
  const { location, error, loading } = useGeolocation();
  const [map, setMap] = React.useState(null);
  const [zoomLevel, setZoomLevel] = React.useState(18);
  const [markerPosition, setMarkerPosition] = React.useState(null);
  const [selectedClub, setSelectedClub] = React.useState(null);
  const [initialMidpoint, setInitialMidpoint] = React.useState(null);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  React.useEffect(() => {
    if (location) {
      setMarkerPosition(location); // Set initial marker position to geolocation
    }
  }, [location]);

  const handleMidpointChange = (midpoint) => {
    if (midpoint && !initialMidpoint) {
      setInitialMidpoint(midpoint);
    }
  };

  if (!isLoaded) return <p>Loading map...</p>
  if (loading || !location || !location.lat || !location.lng || !markerPosition || !markerPosition.lat || !markerPosition.lng) return <p>Fetching location...</p>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex min-h-screen">
      <div className="w-full md:w-1/5 flex-grow max-h-screen overflow-y-auto">
        <ClubSelector selectedClub={selectedClub} onSelectClub={setSelectedClub} />
      </div>
      <div className="w-full md:w-4/5 flex flex-col items-center justify-center flex-grow">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%'}}
          zoom={zoomLevel}
          center={initialMidpoint || location}
          onLoad={map => setMap(map)}
          onDblClick={async event => {
            setMarkerPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() })
          }}
          options={{
            disableDefaultUI: true,
            mapTypeId: 'satellite',
          }}
        >
          {/* Absolute position button */}
          <Button
            type="default"
            style={{ position: 'absolute', top: 10, right: 10 }}
            onClick={() => map.setCenter(location)}
            icon={<CompassOutlined/>}
          >
          </Button>
          <GolfShotMapMarker selectedClub={selectedClub} position={markerPosition} onMidpointChange={handleMidpointChange}/>
        </GoogleMap>
      </div>
    </div>
  );
};

export default MapComponent;

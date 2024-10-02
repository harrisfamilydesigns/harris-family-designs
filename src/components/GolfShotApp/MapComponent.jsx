import React from 'react';
// Have to use the F suffix with React 18+
import {
  GoogleMap,
  useJsApiLoader,
} from '@react-google-maps/api';
import useGeolocation from 'hooks/useGeolocation';
import ClubSelector from './ClubSelector';
import GolfShotMapMarker from './GolfShotMapMarker';
import { Button, Modal, Typography } from 'antd';
import { CompassOutlined } from '@ant-design/icons';
import CirclesIcon from '../shared/CirclesIcon';
import { set } from 'lodash';

const MapComponent = () => {
  const { location, error, loading } = useGeolocation();
  const [map, setMap] = React.useState(null);
  const [zoomLevel, setZoomLevel] = React.useState(18);
  const [markerPosition, setMarkerPosition] = React.useState(null);
  const [destination, setDestination] = React.useState(null);
  const [selectedClub, setSelectedClub] = React.useState(null);
  const [clubPower, setClubPower] = React.useState(1);
  const [standardDistancesVisible, setStandardDistancesVisible] = React.useState(false);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  // Disable scrolling on the body when the map is open to make mobile experience better
  React.useEffect(() => {
    const currentOverflowSetting = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = currentOverflowSetting;
    }
  }, []);

  React.useEffect(() => {
    if (location) {
      setMarkerPosition(location); // Set initial marker position to geolocation
    }
  }, [location]);

  const toggleStandardDistancesVisibility = () => {
    setStandardDistancesVisible(visible => !visible);
  };

  if (!isLoaded) return <p>Loading map...</p>
  if (loading || !location || !location.lat || !location.lng || !markerPosition || !markerPosition.lat || !markerPosition.lng) return <p>Fetching location...</p>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex min-h-screen">
      <div className="w-full flex flex-col items-center justify-center flex-grow">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%'}}
          zoom={zoomLevel}
          center={location}
          onLoad={map => setMap(map)}
          onDblClick={async event => {
            setDestination({ lat: event.latLng.lat(), lng: event.latLng.lng() });
            // setMarkerPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() })
          }}
          options={{
            disableDefaultUI: true,
            mapTypeId: 'satellite',
            disableDoubleClickZoom: true,
            gestureHandling: 'greedy',
            rotateControl: true,
            rotateControlOptions: {
              position: window.google.maps.ControlPosition.TOP_RIGHT
            }
          }}
        >
          {/* Absolute position controls */}
          <div className="absolute top-0 right-0 m-3 text-right">

          </div>
          <GolfShotMapMarker
            selectedClub={selectedClub}
            position={markerPosition}
            destination={destination}
            onClubPowerChange={setClubPower}
            onMarkerPositionChange={setMarkerPosition}
            onDestinationChange={setDestination}
            standardDistancesVisible={standardDistancesVisible}
          />
        </GoogleMap>
      </div>

      {/* Club Selector Button at the Bottom */}
      <div className="absolute bottom-3 right-0 m-3 text-right">
        <div className="flex flex-col items-end">
          <Button
            type="default"
            onClick={() => map.setCenter(destination)}
            icon={<CompassOutlined/>}
          >Center Target</Button>
          <Button
            type="default"
            className="mt-3"
            onClick={() => map.setCenter(markerPosition)}
            icon={<CompassOutlined/>}
          >Center Stance</Button>
          {selectedClub && (
            <div className="bg-slate-800 bg-opacity-75 rounded-bl-lg p-3 rounded mt-3">
              <div>
                <Typography.Text className="text-white">{selectedClub.name}</Typography.Text>
              </div>
              <div>
                <Typography.Text className="text-white">{Math.round(selectedClub.carryDistanceYards * clubPower)}yd</Typography.Text>
              </div>
              <div>
                <Typography.Text className="text-white">{Math.round(clubPower * 100)}%</Typography.Text>
              </div>
            </div>
          )}

          <div className="mt-3 flex items-center">
            <div className="mr-3">
              <Button
                type="default"
                onClick={toggleStandardDistancesVisibility}
                icon={<CirclesIcon
                  style={{ color: standardDistancesVisible ? 'black' : 'gray' }}
                />}
              />
            </div>
            <ClubSelector
              selectedClub={selectedClub}
              onSelectClub={setSelectedClub}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;

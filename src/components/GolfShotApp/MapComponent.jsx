import React from 'react';
// Have to use the F suffix with React 18+
import {
  GoogleMap,
  useJsApiLoader,
} from '@react-google-maps/api';
import useGeolocation from 'hooks/useGeolocation';
import ClubSelector from './ClubSelector';
import GolfShotMapMarker from './GolfShotMapMarker';
import { Button, Typography } from 'antd';
import { CompassOutlined, EditOutlined } from '@ant-design/icons';
import CirclesIcon from '../shared/CirclesIcon';
import { useClubContext } from 'providers/GolfShotApp/ClubProvider';
import { useResetDefaultClubs } from 'api/resources/GolfShotApp/clubs';

const DEFAULT_ZOOM_LEVEL = 18;
const MapComponent = () => {
  const {
    selectedClub,
    setEditingClub,
    markerPosition,
    setMarkerPosition,
    ballPosition,
    clubPower,
  } = useClubContext();
  const { location, error, loading } = useGeolocation();
  const [map, setMap] = React.useState(null);
  const [zoomLevel, setZoomLevel] = React.useState(DEFAULT_ZOOM_LEVEL);
  const [standardDistancesVisible, setStandardDistancesVisible] = React.useState(false);
  const { resetDefaultClubs } = useResetDefaultClubs();

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

  const handleDropMarker = () => {
    setMarkerPosition(map.getCenter().toJSON());
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
          onDblClick={event => {
            setMarkerPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() })
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
          <div className="absolute top-0 left-0 text-left z-0">
            <div className="mt-3 ml-3">
              <Button type="default" onClick={resetDefaultClubs}>Reset clubs</Button>
            </div>
            {selectedClub && (
              <div className="bg-slate-800 bg-opacity-75 rounded-bl-lg p-3 rounded mt-3 ml-3">
                <div>
                  <Typography.Text className="text-white">{selectedClub.name}</Typography.Text>
                </div>
                <div>
                  <Typography.Text className="text-white">{Math.round(selectedClub.carryDistanceYards * clubPower)}yd</Typography.Text>
                </div>
                <div>
                  <Typography.Text className="text-white">{Math.round(clubPower * 100)}%</Typography.Text>
                </div>
                <Button type="text" className="p-0" onClick={() => setEditingClub(selectedClub)}>
                  <div className="flex items-center">
                    <EditOutlined className="text-white mr-2"/>
                    <span className="text-white">Edit</span>
                  </div>
                </Button>
              </div>
            )}
          </div>

          {/* Absolute position controls */}
          <div className="absolute top-0 right-0 text-right z-0">
          </div>

          <GolfShotMapMarker standardDistancesVisible={standardDistancesVisible} />
        </GoogleMap>
      </div>

      {/* Club Selector Button at the Bottom */}
      <div className="absolute bottom-[48px] left-0 mb-3 ml-3">
        <div>
          <Button
            type="default"
            className="mb-3"
            onClick={handleDropMarker}
            icon={<CompassOutlined/>}
          >Drop Marker Into View</Button>
        </div>
        <div>
          <Button
            type="default"
            onClick={() => map.setCenter(ballPosition)}
            icon={<CompassOutlined/>}
          >View Target</Button>
        </div>
        <div>
          <Button
            type="default"
            className="mt-3"
            onClick={() => map.setCenter(markerPosition)}
            icon={<CompassOutlined/>}
          >View Stance</Button>
        </div>
        <div>
          <Button
            className="mt-3"
            type="default"
            onClick={toggleStandardDistancesVisibility}
            icon={<CirclesIcon
              style={{ color: standardDistancesVisible ? 'black' : 'gray' }}
            />}
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <ClubSelector />
      </div>
    </div>
  );
};

export default MapComponent;

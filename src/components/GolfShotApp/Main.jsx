import ClubFormModal from "./ClubFormModal";
import MapComponent from "./MapComponent";
import { ClubProvider } from 'providers/GolfShotApp/ClubProvider';

const Main = () => {
  return (
    <ClubProvider>
      <MapComponent />
      <ClubFormModal />
    </ClubProvider>
  );
}

export default Main;

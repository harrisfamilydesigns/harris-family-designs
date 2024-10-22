import { createContext, useContext, useState, useEffect } from 'react';
import { calculateBallPosition } from '../../helpers/GolfShotApp/ShotHelpers';

const ClubContext = createContext();

export const ClubProvider = ({ children }) => {
  const [selectedClub, setSelectedClub] = useState(null);
  const [addClubModalOpen, setAddClubModalOpen] = useState(false);
  const [editingClub, setEditingClub] = useState(null);

  const [markerPosition, setMarkerPosition] = useState(null);
  const [ballPosition, setBallPosition] = useState(null);
  const [heading, setHeading] = useState('0');
  const [clubPower, setClubPower] = useState(1);

  const openAddClubModal = () => {
    setEditingClub(null);
    setAddClubModalOpen(true);
  }

  const openEditClubModal = (club) => {
    setAddClubModalOpen(false);
    setEditingClub(club);
  }

  const closeModals = () => {
    setAddClubModalOpen(false);
    setEditingClub(null);
  }

  useEffect(() => {
    if (selectedClub) {
      const newBallPosition = calculateBallPosition(markerPosition, selectedClub.carryDistanceYards * clubPower, heading);
      setBallPosition(newBallPosition);
    }
  }, [selectedClub]);

  useEffect(() => {
    if (markerPosition) {
      if (ballPosition) {
        const newBallPosition = calculateBallPosition(markerPosition, selectedClub.carryDistanceYards * clubPower, heading);
        setBallPosition(newBallPosition);
      }
    }
  }, [markerPosition]);

  // useEffect(() => {
  //   if (ballPosition) {
  //     const newHeading = window.google.maps.geometry.spherical.computeHeading(markerPosition, initialDestination);
  //     const newClubPower = calculateDistance(markerPosition, ballPosition) / (selectedClub.carryDistanceYards * MAX_CLUB_POWER);
  //     setHeading(newHeading);
  //     setClubPower(newClubPower);
  //   }
  // }, [ballPosition]);

  return (
    <ClubContext.Provider value={{
      selectedClub,
      setSelectedClub,
      openAddClubModal,
      openEditClubModal,
      closeModals,
      addClubModalOpen,
      setEditingClub,
      editingClub,

      markerPosition,
      setMarkerPosition,
      ballPosition,
      setBallPosition,
      heading,
      setHeading,
      clubPower,
      setClubPower,
    }}>
      {children}
    </ClubContext.Provider>
  );
}

// Example usage:
// import { ClubProvider } from 'providers/GolfShotApp/ClubProvider';
//
// const App = () => {
//   return (
//     <ClubProvider>
//       <Main />
//     </ClubProvider>
//   );
// }
//
// export default App;

export const useClubContext = () => {
  const context = useContext(ClubContext);
  if (!context) {
    throw new Error('useClub must be used within a ClubProvider');
  }
  return context;
}

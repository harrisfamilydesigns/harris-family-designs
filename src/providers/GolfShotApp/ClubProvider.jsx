import { createContext, useContext, useState } from 'react';

const ClubContext = createContext();

export const ClubProvider = ({ children }) => {
  const [selectedClub, setSelectedClub] = useState(null);
  const [addClubModalOpen, setAddClubModalOpen] = useState(false);
  const [editingClub, setEditingClub] = useState(null);

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

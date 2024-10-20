import React from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { useGetClubs } from 'api/resources/GolfShotApp/clubs';
import { TabBar } from 'antd-mobile';
import { useClubContext } from 'providers/GolfShotApp/ClubProvider';

const ClubSelector = () => {
  const {
    selectedClub,
    setSelectedClub,
    openAddClubModal,
  } = useClubContext();
  const { data: clubs, isLoading: clubsLoading } = useGetClubs();

  const handleSelectClub = (clubId) => {
    if (clubId === 'addClub') {
      openAddClubModal();
      return;
    }

    const club = clubs.find(club => club.id.toString() === clubId.toString());
    setSelectedClub(club);
  };

  React.useEffect(() => {
    if (clubs && !selectedClub) {
      handleSelectClub(clubs[0].id);
    }
  }, [clubs])



  if (clubsLoading) return <p>Loading clubs...</p>;

  return (
    <TabBar
      className='bg-white tab-bar-horizontal-overflow'
      activeKey={selectedClub?.id.toString()}
      onChange={handleSelectClub}
    >
      {[...clubs].sort((a, b) => parseInt(a.id) - parseInt(b.id)).map(club => (
        <TabBar.Item
          key={club.id}
          title={club.name}
        />
      ))}
      <TabBar.Item
        key={'addClub'}
        title={<PlusOutlined />}
      />
    </TabBar>
  );
};

export default ClubSelector;

import React from 'react';
import { clubs } from 'helpers/GolfShotApp/ShotHelpers';

const ClubSelector = ({ selectedClub, onSelectClub }) => {
  return (
    <div style={styles.container}>
      <h4>Select Club</h4>
      <ul style={styles.list}>
        {clubs.map((club) => (
          <li
            key={club.name}
            style={{
              ...styles.item,
              backgroundColor: selectedClub.name === club.name ? 'lightgray' : 'white',
            }}
            onClick={() => onSelectClub(club)}
          >
            {club.name} - {club.distanceInFeet} ft
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    position: 'absolute',
    top: '10%',
    left: '10px',
    backgroundColor: 'white',
    padding: '10px',
    border: '1px solid black',
    zIndex: 10,
    borderRadius: '8px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  item: {
    cursor: 'pointer',
    padding: '8px 12px',
    marginBottom: '5px',
    border: '1px solid black',
    borderRadius: '4px',
  },
};

export default ClubSelector;

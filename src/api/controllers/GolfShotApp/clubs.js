// This is acting as a pseudo backend for the clubs resource, but just using localstorage for now
// JSDoc type definitions
/**
 * @typedef {Object} Club
 * @property {number} id
 * @property {string} name
 * @property {number} carryDistanceYards
 * @property {number} totalDistanceYardsPlusMinus
 * @property {number} dispersionRadiusYardsPlusMinus
 */
const defaultClubs = [
  {id: 1, name: 'Driver', carryDistanceYards: 282, totalDistanceYardsPlusMinus: 20, dispersionRadiusYardsPlusMinus: 35},
  {id: 2, name: '3-Wood', carryDistanceYards: 249, totalDistanceYardsPlusMinus: 18, dispersionRadiusYardsPlusMinus: 33},
  {id: 3, name: '5-Wood', carryDistanceYards: 236, totalDistanceYardsPlusMinus: 17, dispersionRadiusYardsPlusMinus: 31},
  {id: 4, name: 'Hybrid', carryDistanceYards: 231, totalDistanceYardsPlusMinus: 17, dispersionRadiusYardsPlusMinus: 30},
  {id: 5, name: '3-Iron', carryDistanceYards: 218, totalDistanceYardsPlusMinus: 16, dispersionRadiusYardsPlusMinus: 26},
  {id: 6, name: '4-Iron', carryDistanceYards: 209, totalDistanceYardsPlusMinus: 15, dispersionRadiusYardsPlusMinus: 24},
  {id: 7, name: '5-Iron', carryDistanceYards: 199, totalDistanceYardsPlusMinus: 14, dispersionRadiusYardsPlusMinus: 22},
  {id: 8, name: '6-Iron', carryDistanceYards: 188, totalDistanceYardsPlusMinus: 13, dispersionRadiusYardsPlusMinus: 20},
  {id: 9, name: '7-Iron', carryDistanceYards: 176, totalDistanceYardsPlusMinus: 12, dispersionRadiusYardsPlusMinus: 18},
  {id: 10, name: '8-Iron', carryDistanceYards: 164, totalDistanceYardsPlusMinus: 11, dispersionRadiusYardsPlusMinus: 16},
  {id: 11, name: '9-Iron', carryDistanceYards: 152, totalDistanceYardsPlusMinus: 10, dispersionRadiusYardsPlusMinus: 14},
  {id: 12, name: 'Pitching Wedge', carryDistanceYards: 142, totalDistanceYardsPlusMinus: 9, dispersionRadiusYardsPlusMinus: 12},
  {id: 13, name: 'Gap Wedge', carryDistanceYards: 125, totalDistanceYardsPlusMinus: 8, dispersionRadiusYardsPlusMinus: 9},
  {id: 14, name: 'Sand Wedge', carryDistanceYards: 115, totalDistanceYardsPlusMinus: 5, dispersionRadiusYardsPlusMinus: 7},
  {id: 15, name: 'Lob Wedge', carryDistanceYards: 105, totalDistanceYardsPlusMinus: 4, dispersionRadiusYardsPlusMinus: 5},
];

const clubAttributes = [
  'name',
  'carryDistanceYards',
  'totalDistanceYardsPlusMinus',
  'dispersionRadiusYardsPlusMinus',
];

const attributeProcessors = {
  carryDistanceYards: (value) => Number.parseInt(value),
  totalDistanceYardsPlusMinus: (value) => Number.parseInt(value),
  dispersionRadiusYardsPlusMinus: (value) => Number.parseInt(value),
};

export const getClubs = async () => {
  let clubs = [];
  if (!localStorage.getItem('clubs')) {
    localStorage.setItem('clubs', JSON.stringify(defaultClubs));
  }
  clubs = JSON.parse(localStorage.getItem('clubs'));
  // Sort by carry distance in descending order
  return clubs.sort((a, b) => {
    return b.carryDistanceYards - a.carryDistanceYards;
  });
}

export const addClub = async (params) => {
  const clubs = await getClubs();
  const uniqueId = Math.max(...clubs.map((club) => Number.parseInt(club.id))) + 1;
  const validParams = Object.entries(params).filter(([key, value]) => clubAttributes.includes(key));
  const processedParams = validParams.map(([key, value]) => {
    if (attributeProcessors[key]) {
      return [key, attributeProcessors[key](value)];
    }
    return [key, value];
  });
  const newClub = {id: uniqueId, ...Object.fromEntries(processedParams)};
  const newClubs = [...clubs, newClub];
  localStorage.setItem('clubs', JSON.stringify(newClubs));
  return newClub;
}

export const updateClub = async (id, params) => {
  const clubs = await getClubs();
  const validParams = Object.entries(params).filter(([key, value]) => clubAttributes.includes(key));
  const processedParams = validParams.map(([key, value]) => {
    if (attributeProcessors[key]) {
      return [key, attributeProcessors[key](value)];
    }
    return [key, value];
  });
  const clubToUpdate = clubs.find((club) => Number.parseInt(club.id) === Number.parseInt(id));
  const updatedClub = {...clubToUpdate, ...Object.fromEntries(processedParams)};
  const updatedClubs = clubs.map((club) => {
    if (Number.parseInt(club.id) === Number.parseInt(id)) {
      return updatedClub;
    }
    return club;
  });
  localStorage.setItem('clubs', JSON.stringify(updatedClubs));
  return updatedClubs;
}

export const deleteClub = async (id) => {
  const clubs = await getClubs();
  const updatedClubs = clubs.filter((club) => Number.parseInt(club.id) !== Number.parseInt(id));
  localStorage.setItem('clubs', JSON.stringify(updatedClubs));
  return updatedClubs;
}

export const resetDefaultClubs = async () => {
  localStorage.setItem('clubs', JSON.stringify(defaultClubs));
  return defaultClubs;
}

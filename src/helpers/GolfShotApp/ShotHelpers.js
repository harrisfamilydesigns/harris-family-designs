const earthRadiusFeet = 20902230; // Earth's radius in feet

/**
 * Calculates the destination point from a given latitude, longitude, distance, and bearing.
 * @param {number} lat - Latitude of the starting point.
 * @param {number} lng - Longitude of the starting point.
 * @param {number} distanceInFeet - Distance to the destination point in feet.
 * @param {number} bearingInDegrees - Bearing in degrees (0 = North, 90 = East, etc.).
 * @returns {{ lat: number, lng: number }} - The destination point's latitude and longitude.
 */
export const calculateDestination = (startingLocation, distanceInFeet, bearingInDegrees) => {
  const { lat, lng } = startingLocation;
  const distanceInRadians = distanceInFeet / earthRadiusFeet;
  const bearingInRadians = (bearingInDegrees * Math.PI) / 180;

  const latInRadians = (lat * Math.PI) / 180;
  const lngInRadians = (lng * Math.PI) / 180;

  const destLatInRadians = Math.asin(
    Math.sin(latInRadians) * Math.cos(distanceInRadians) +
      Math.cos(latInRadians) * Math.sin(distanceInRadians) * Math.cos(bearingInRadians)
  );

  const destLngInRadians =
    lngInRadians +
    Math.atan2(
      Math.sin(bearingInRadians) * Math.sin(distanceInRadians) * Math.cos(latInRadians),
      Math.cos(distanceInRadians) - Math.sin(latInRadians) * Math.sin(destLatInRadians)
    );

  const destLat = (destLatInRadians * 180) / Math.PI;
  const destLng = (destLngInRadians * 180) / Math.PI;

  return { lat: destLat, lng: destLng };
};

export const calculateTangentBearings = (distance, diffusionRadius) => {
  // Using small angle approximation for precision
  const tangentAngleInRadians = Math.atan(diffusionRadius / distance);
  const tangentAngleInDegrees = tangentAngleInRadians * (180 / Math.PI); // Convert to degrees
  return tangentAngleInDegrees;
};

export const feetToMeters = (feet) => feet * 0.3048;

export const clubs = [
  {name: 'driver', distanceInFeet: 220, diffusionRadius: 50},
  {name: '3w', distanceInFeet: 210, diffusionRadius: 40},
  {name: '5w', distanceInFeet: 190, diffusionRadius: 35},
  {name: '3h', distanceInFeet: 180, diffusionRadius: 30},
  {name: '4h', distanceInFeet: 170, diffusionRadius: 25},
  {name: '5h', distanceInFeet: 160, diffusionRadius: 20},
  {name: '6h', distanceInFeet: 150, diffusionRadius: 20},
  {name: '7h', distanceInFeet: 140, diffusionRadius: 15},
  {name: '8h', distanceInFeet: 130, diffusionRadius: 15},
  {name: '9h', distanceInFeet: 120, diffusionRadius: 10},
  {name: 'pw', distanceInFeet: 110, diffusionRadius: 10},
  {name: 'gw', distanceInFeet: 100, diffusionRadius: 8},
  {name: 'sw', distanceInFeet: 90, diffusionRadius: 8},
  {name: 'lw', distanceInFeet: 80, diffusionRadius: 5},
];

// TODO: Make this personalizable based on user input
export const clubDistance = (club) => {
  return clubMap[club];
};

export const direction = (str) => {
  const directionMap = {
    N: 0,
    NE: 45,
    E: 90,
    SE: 135,
    S: 180,
    SW: 225,
    W: 270,
    NW: 315,
  };

  return directionMap[str];
}

export const calculateBearing = (start, end) => {
  const toRadians = (degree) => (degree * Math.PI) / 180;

  const lat1 = toRadians(start.lat);
  const lon1 = toRadians(start.lng);
  const lat2 = toRadians(end.lat);
  const lon2 = toRadians(end.lng);

  const dLon = lon2 - lon1;

  const x = Math.sin(dLon) * Math.cos(lat2);
  const y = Math.cos(lat1) * Math.sin(lat2) -
            Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

  const initialBearing = Math.atan2(x, y);

  // Convert from radians to degrees and normalize to 0-360
  const bearing = (initialBearing * 180) / Math.PI;
  return (bearing + 360) % 360; // Normalize to 0-360 degrees
};

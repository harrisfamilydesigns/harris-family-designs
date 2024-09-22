const EARTH_RADIUS_YARDS = 6967410; // Earth's radius in yards
const YARDS_TO_METERS = 0.9144; // Conversion factor from yards to meters

/**
 * Calculates the destination point from a given latitude, longitude, distance, and bearing.
 * @param {number} lat - Latitude of the starting point.
 * @param {number} lng - Longitude of the starting point.
 * @param {number} carryDistanceYards - Distance to the destination point in feet.
 * @param {number} bearingInDegrees - Bearing in degrees (0 = North, 90 = East, etc.).
 * @returns {{ lat: number, lng: number }} - The destination point's latitude and longitude.
 */
export const calculateDestination = (startingLocation, carryDistanceYards, bearingInDegrees) => {
  const { lat, lng } = startingLocation;
  const distanceInRadians = carryDistanceYards / EARTH_RADIUS_YARDS;
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

export const calculateTangentBearings = (distance, dispersionRadiusYardsPlusMinus) => {
  // Using small angle approximation for precision
  const tangentAngleInRadians = Math.atan(dispersionRadiusYardsPlusMinus / distance);
  const tangentAngleInDegrees = tangentAngleInRadians * (180 / Math.PI); // Convert to degrees
  return tangentAngleInDegrees;
};

export const yardsToMeters = (yards) => yards * YARDS_TO_METERS;

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

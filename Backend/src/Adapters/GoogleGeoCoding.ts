import axios from 'axios';
import { API_KEY } from './APIKeys/GoogleGeoLocationKey';

const getAddressURL = (latitude: string, longitude: string) => {
  return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;
};

export const getFullAddress = async (latitude: string, longitude: string) => {
  if (!latitude || !longitude) {
    return '';
  }
  try {
    const url = getAddressURL(latitude, longitude);
    const { data } = await axios.get(url);
    const formatted_address = data?.results[0]?.formatted_address || '';
    return formatted_address;
  } catch (e) {
    console.log(e);
  }
};

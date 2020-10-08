const exifr = require('exifr'); // => exifr/dist/full.umd.cjs
import { getFullAddress } from '../adapters/GoogleGeoCoding';

const defaultGPSData = {
  latitude: '31.262325',
  longitude: '34.804234',
  fullAddress: 'Default address',
};

export const getGeoLocation = async (imagePath: string) => {
  try {
    const { latitude, longitude } = await exifr.gps(imagePath);
    console.log('latitude: ', latitude);
    console.log('longitude: ', longitude);
    console.log('fetching full address..');
    const fullAddress = await getFullAddress(latitude, longitude);
    console.log('fullAddress: ', JSON.stringify(fullAddress));
    return {
      latitude,
      longitude,
      fullAddress,
    };
  } catch (e) {
    console.log(e);
    return defaultGPSData;
  }
};

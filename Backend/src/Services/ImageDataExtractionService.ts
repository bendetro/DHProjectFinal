import { detectTextInImage } from '../adapters/GoogleVisionAPI';
import { insertIntoDB } from '../adapters/dbAdapter';
import { createCSV } from './CSVService';
import { sendImageToOwner } from './MailService';
import { getGeoLocation } from './LocationService';

export interface ExtractionResult {
  id: number;
  content: string;
  latitude: string;
  longitude: string;
  fullAddress: string;
}

export const extractDataFromImage = async (
  image: any
): Promise<ExtractionResult> => {
  let id = -1;
  const ImagePath = './' + image.name;
  image.mv(ImagePath);
  console.log('detecting Geo Location..');
  const { latitude, longitude, fullAddress } = await getGeoLocation(ImagePath);
  console.log('detecting text..');
  const content = await detectTextInImage(ImagePath);
  console.log(`found text: ${content}`);
  try {
    id = await insertIntoDB(
      ImagePath,
      content,
      latitude,
      longitude,
      fullAddress
    );
    await createCSV([{ content, id, latitude, longitude, fullAddress }]);
    await sendImageToOwner('imageocrdhfinal@gmail.com', ImagePath);
  } catch (err) {
    console.log(err);
  } finally {
    return { id, content, latitude, longitude, fullAddress };
  }
};

const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient({
  keyFile: './src/adapters/APIKeys/APIKey.json',
});

export const detectTextInImage = async (imageFile: String) => {
  const errorMessage = 'Could not locate Image content';
  try {
    const [result] = await client.textDetection(imageFile);
    const textAnnotations = result?.textAnnotations || [];
    const extractedText = textAnnotations[0]?.description || errorMessage;
    return extractedText;
  } catch (err) {
    console.log(err);
    return errorMessage;
  }
};

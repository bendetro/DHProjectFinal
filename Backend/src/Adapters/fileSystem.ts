const fs = require('fs');

function deleteFile(file: string) {
  fs.unlinkSync(file, (err: any) => {
    if (err) {
      console.error(err);
      return;
    }
    //file removed
  });
}

export const imageFile = 'image.jpg';
export const OCRFile = 'image.csv';

export const deleteImageFile = function deleteImageFile() {
  deleteFile(imageFile);
};

export const deleteCSVFile = function deleteCSVFile() {
  deleteFile(OCRFile);
};

export const base64_encode = function base64_encode(path: string) {
  return fs.readFileSync(`./${path}`).toString('base64');
};

export const base64_decode = function base64_decode(base64String: string) {
  try {
    deleteFile(imageFile);
  } catch (err) {
    console.log(err);
  } finally {
    let base64Image = base64String.split(';base64,').pop();
    fs.writeFile('image.jpg', base64Image, { encoding: 'base64' }, (err: any) =>
      console.log(err)
    );
    console.log('******** File created from base64 encoded string ********');
  }
};

const Chance = require('chance');
const chance = new Chance();
const axios = require('axios');

export const uploadImage = async (imageArray: any) => {
  const data = new FormData();
  data.append(
    'image',
    new Blob(imageArray),
    `${imageArray[0].name.split('.')[0] + chance.guid()}.${
      imageArray[0].name.split('.')[1]
    }`
  );
  return axios.post('https://whispering-castle-08366.herokuapp.com/', data);
};

export const updateDB = async (data: any) => {
  return axios
    .put('https://whispering-castle-08366.herokuapp.com/', data)
    .catch((err: any) => console.log(err));
};

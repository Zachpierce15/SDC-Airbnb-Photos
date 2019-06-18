const faker = require('faker');

const getRandomInt = (min, max) => {
  const minimum = Math.ceil(min);
  const maximum = Math.floor(max);
  return Math.floor(Math.random() * (maximum - minimum)) + minimum;
};

const generateListingPhotos = () => {
  const photosArray = [];
  const usedPhotos = [];

  // Generate 5-15 photos per listing.
  const numberOfPhotos = 7;
  let counter = 0;

  // Add an arbitrary # of photo objects to an array.
  for (let i = 0; i <= numberOfPhotos; i += 1) {
    const currentPhoto = faker.image.image(720, 480, 'cats');
    // If the randomPhoto has not been used yet, create the photo object with that index.
    if (photosArray.length !== numberOfPhotos) {
      const photoObj = {
        id: counter,
        url: currentPhoto,
        desc: faker.lorem.sentence(),
        isVerified: faker.random.boolean(),
      };
      console.log(photoObj);
      photosArray.push(photoObj);
      usedPhotos.push(currentPhoto);
      counter += 1;
    }
  }
  return photosArray;
};

module.exports = generateListingPhotos;

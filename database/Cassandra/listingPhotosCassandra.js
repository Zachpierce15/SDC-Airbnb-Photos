const faker = require('faker');

const getRandomInt = (min, max) => {
  const minimum = Math.ceil(min);
  const maximum = Math.floor(max);
  return Math.floor(Math.random() * (maximum - minimum)) + minimum;
};

const sentences = [];
const photoUrls = ['https://sdc-photos.s3-us-west-1.amazonaws.com/1.jpeg', 'https://sdc-photos.s3-us-west-1.amazonaws.com/2.jpg', 'https://sdc-photos.s3-us-west-1.amazonaws.com/3.jpg', 'https://sdc-photos.s3-us-west-1.amazonaws.com/4.jpg', 'https://sdc-photos.s3-us-west-1.amazonaws.com/5.jpg', 'https://sdc-photos.s3-us-west-1.amazonaws.com/6.jpg', 'https://sdc-photos.s3-us-west-1.amazonaws.com/7.jpg', 'https://sdc-photos.s3-us-west-1.amazonaws.com/8.jpg'];
const verified = [true, false];

for (let j = 0; j < 15; j += 1) {
  sentences.push(faker.lorem.sentence());
}

const cassandraListingPhotos = () => {
  const photosArray = [];

  // Generate 5-15 photos per listing.
  const numberOfPhotos = 7;
  let counter = 0;

  // Add an arbitrary # of photo objects to an array.
  for (let i = 0; i <= numberOfPhotos; i += 1) {
    // If the randomPhoto has not been used yet, create the photo object with that index.
    if (photosArray.length !== numberOfPhotos) {
      const photoObj = `{ id: ${counter}, url: '${photoUrls[Math.floor(Math.random() * photoUrls.length)]}', description: '${sentences[Math.floor(Math.random() * sentences.length)]}', isverified: ${verified[Math.floor(Math.random() * verified.length)]}}`;
      photosArray.push(photoObj);
      counter += 1;
    }
  }
  return photosArray;
};

module.exports = cassandraListingPhotos;

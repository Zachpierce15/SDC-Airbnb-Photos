const fs = require('fs');
const faker = require('faker');

const wStream = fs.createWriteStream('./postgresPhotos.csv');

const getRandomInt = (min, max) => {
  const minimum = Math.ceil(min);
  const maximum = Math.floor(max);
  return Math.floor(Math.random() * (maximum - minimum)) + minimum;
};

let id = 0; // move to 10000000 after first seeding!!!!
const n = 80000000;
const urls = ['https://sdc-photos.s3-us-west-1.amazonaws.com/1.jpeg', 'https://sdc-photos.s3-us-west-1.amazonaws.com/2.jpg', 'https://sdc-photos.s3-us-west-1.amazonaws.com/3.jpg', 'https://sdc-photos.s3-us-west-1.amazonaws.com/4.jpg', 'https://sdc-photos.s3-us-west-1.amazonaws.com/5.jpg', 'https://sdc-photos.s3-us-west-1.amazonaws.com/6.jpg', 'https://sdc-photos.s3-us-west-1.amazonaws.com/7.jpg', 'https://sdc-photos.s3-us-west-1.amazonaws.com/8.jpg'];
const desc = [];
const booleans = [true, false];

async function writingEverything() {
  for (let i = 0; i <= 200; i += 1) {
    desc.push(faker.lorem.sentence());
  }
  for (let j = 0; j <= n; j += 1) {
    const header = 'id, url, description, is_verified, listing';
    const values = `${id},${urls[Math.floor(Math.random() * urls.length)]},${desc[Math.floor(Math.random() * desc.length)]}, ${booleans[[Math.floor(Math.random() * booleans.length)]]},${getRandomInt(1, 10000000)}`;
    id += 1;
    if (j === 0) {
      wStream.write(`${header}\n`, (err) => {
        if (err) console.log(err);
        if (j % 1000000 === 0) {
          console.log(j);
        }
      });
    } else {
      const writingS = wStream.write(`${values}\n`);
      if (!writingS) {
        await new Promise((resolve) => {
          wStream.once('drain', resolve);
        });
      }
      if (j % 1000000 === 0) {
        console.log(j);
      }
    }
  }
}

writingEverything();

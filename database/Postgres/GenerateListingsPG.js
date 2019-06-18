const fs = require('fs');
const faker = require('faker');
// ================= FS Writable Stream Attempt =========
const wStream = fs.createWriteStream('./postgresListings.csv');
const getRandomInt = (min, max) => {
  const minimum = Math.ceil(min);
  const maximum = Math.floor(max);
  return Math.floor(Math.random() * (maximum - minimum)) + minimum;
};

let listingCount = 0;
const sentences = [];
const boolean = [true, false];
const locations = [];
const names = [];
const n = 10000000;

for (let j = 0; j < 100; j += 1) {
  const sentence = faker.lorem.sentences(3, 3);
  const listingLocation = faker.address.city();
  const name = faker.name.findName();
  sentences.push(sentence);
  locations.push(listingLocation);
  names.push(name);
}
async function writingEverything() {
  for (let i = 0; i <= n; i += 1) {
    const photo = {
      id: listingCount,
      description: sentences[Math.floor(Math.random() * sentences.length)],
      is_saved: boolean[Math.floor(Math.random() * boolean.length)],
      location: getRandomInt(1, 100000),
      user_id: getRandomInt(1, 20000000),
    };

    const values = `${photo.id},${photo.description},${photo.user_id},${photo.is_saved},${photo.location}`;
    const header = 'id,description,host_id,is_saved,location';
    listingCount += 1;
    if (i === 0) {
      wStream.write(`${header}\n`, (err) => {
        if (err) throw err;
        if (i % 1000000 === 0) {
          console.log(i);
        }
      });
    } else {
      const writingS = wStream.write(`${values}\n`);
      if (!writingS) {
        await new Promise((resolve) => {
          wStream.once('drain', resolve);
        });
      }
      if (i % 1000000 === 0) {
        console.log(i);
      }
    }
  }
}
writingEverything();

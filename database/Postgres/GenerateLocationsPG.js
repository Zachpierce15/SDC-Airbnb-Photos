const fs = require('fs');
const faker = require('faker');

const wStream = fs.createWriteStream('./postgresLocations.csv');

let id = 0;
const locations = [];
const start = new Date().getTime();
const n = 100000;

for (let i = 0; i <= 500; i += 1) {
  locations.push(faker.address.city());
}
for (let j = 0; j <= n; j += 1) {
  const header = 'id, location';
  const values = `${id},${locations[Math.floor(Math.random() * locations.length)]}`;
  id += 1;
  if (j === 0) {
    wStream.write(`${header}\n`, (err) => {
      if (err) console.log(err);
      if (j % 100000 === 0) {
        console.log(j);
      }
    });
  } else {
    wStream.write(`${values}\n`, (err) => {
      if (err) console.log(err);
      if (j % 100000 === 0) {
        console.log(j);
      }
    });
  }
}

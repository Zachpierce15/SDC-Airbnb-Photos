const fs = require('fs');
const faker = require('faker');

const wStream = fs.createWriteStream('./postgresUsers.csv');

let userId = 1;
const users = [];
const n = 20000000;

for (let i = 0; i <= 500; i += 1) {
  users.push(faker.name.findName());
}
for (let j = 0; j <= n; j += 1) {
  const header = 'id, username';
  const values = `${userId},${users[Math.floor(Math.random() * users.length)]}`;
  userId += 1;
  if (j === 0) {
    wStream.write(`${header}\n`, (err) => {
      if (err) console.log(err);
      if (j % 20000000 === 0) {
        console.log(j);
      }
    });
  } else {
    wStream.write(`${values}\n`, (err) => {
      if (err) console.log(err);
      if (j % 20000000 === 0) {
        console.log(j);
      }
    });
  }
}

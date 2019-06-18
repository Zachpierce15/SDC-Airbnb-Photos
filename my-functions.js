/* eslint-disable no-param-reassign */

// Make sure to "npm install faker" first.
const Faker = require('faker');

const urls = ['https://sdc-photos.s3-us-west-1.amazonaws.com/1.jpeg', 'https://sdc-photos.s3-us-west-1.amazonaws.com/2.jpg', 'https://sdc-photos.s3-us-west-1.amazonaws.com/3.jpg', 'https://sdc-photos.s3-us-west-1.amazonaws.com/4.jpg', 'https://sdc-photos.s3-us-west-1.amazonaws.com/5.jpg', 'https://sdc-photos.s3-us-west-1.amazonaws.com/6.jpg', 'https://sdc-photos.s3-us-west-1.amazonaws.com/7.jpg', 'https://sdc-photos.s3-us-west-1.amazonaws.com/8.jpg'];
const booleans = [true, false];

function generateRandomData(userContext, events, done) {
  // generate data with Faker:
  const url = urls[Math.floor(Math.random() * urls.length)];
  const desc = Faker.lorem.sentence();
  const boolean = `${booleans[[Math.floor(Math.random() * booleans.length)]]}`
  // add variables to virtual user's context:
  userContext.vars.url = url;
  userContext.vars.desc = desc;
  userContext.vars.verified = boolean;

  // continue with executing the scenario:
  return done();
}

module.exports = {
  generateRandomData,
};

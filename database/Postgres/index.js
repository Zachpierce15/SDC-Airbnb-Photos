const { Pool, Client } = require('pg');
// const redis = require('redis');
// const client = redis.createClient();

const pool = new Pool({
  user: 'postgres',
  host: 'ec2-18-222-208-67.us-east-2.compute.amazonaws.com',
  database: 'photos',
  password: 'Lacrosseis1!',
  port: 5432,
});
pool.connect()
  .then(() => console.log('CONNECTED'))
  .catch(err => console.log(err));
// ========== GET ===========
const getPhotos = (targetId, req, res) => {
  // const isbn = req.params.listingID;
  console.log('THIS IS WORKING');
  pool.query(`SELECT * FROM photos WHERE listing=${targetId}`, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      // client.setex(isbn, 3600, JSON.stringify(data));
      res.status(200).send(data);
    }
  });
};
const getListingInfo = (targetId, req, res) => {
  // const isbn = req.params.listingID;
  pool.query(`SELECT * FROM listings WHERE id=${targetId}`, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
      // client.setex(`${isbn}listing`, 3600, JSON.stringify(data));
    }
  });
};
  // ========== INSERT ============
const insertPhoto = (listing, id, photo, res) => {
  pool.query(`INSERT INTO photos (id,url,description,is_verified,listing) VALUES (${id},'${photo.url}','${photo.desc}',${photo.isVerified},${listing})`, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('Added');
    }
  });
};
  // ========== DELETE =============
const deletePhoto = (photoId, res) => {
  pool.query(`DELETE FROM photos WHERE id=${photoId}`, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('Deleted');
    }
  });
};
  // ========= UPDATE ===========
const updatePhoto = (photoId, updatedPhoto, res) => {
  pool.query(`UPDATE photos SET description = '${updatedPhoto.desc}' WHERE id = ${photoId}`, (err, results) => {
    if (err) {
      console.log(err)
      res.status(500).send(err);
    } else {
      res.status(200).send('Updated');
    }
  });
};
module.exports = {
  getPhotos,
  getListingInfo,
  insertPhoto,
  deletePhoto,
  updatePhoto,
};

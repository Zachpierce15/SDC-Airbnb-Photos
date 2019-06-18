const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/photos', { useNewUrlParser: true, useCreateIndex: true });

// Schema
const listingSchema = mongoose.Schema({
  listingID: { type: Number, unique: true },
  listingDesc: String,
  isSaved: Boolean,
  listingPhotos: [{
    id: { type: Number, unique: true }, url: String, desc: String, isVerified: Boolean,
  }],
});

// Listing model
const Listing = mongoose.model('Listing', listingSchema);

// Get photos from DB.
const getPhotos = (targetID, callback) => {
  Listing.find({ listingID: targetID }, (err, photos) => {
    if (err) {
      callback(err);
    } else {
      callback(null, photos);
    }
  });
};

// =========== POST photos to the database ==========
const addPhoto = (photo, id, callback) => {
  Listing.updateOne(
    { listingID: id },
    { $push: { listingPhotos: photo } }, (err, results) => {
      if (err) {
        callback(err, '');
      } else {
        callback(null, results);
      }
    },
  );
};
module.exports = {
  Listing,
  getPhotos,
  addPhoto,
};

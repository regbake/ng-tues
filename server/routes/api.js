const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

//connect
const connection = (closure) => {
  return MongoClient.connect('mongodb://localhost:27017/ng-tues', (err, client) => {
    const db = client.db('ng-tues');

    if (err) return console.log(err);

    closure(db);
  })


  //below is OG
  // return MongoClient.connect('mongodb://localhost:27017/ng-tues', (err, db) => {
  //   if (err) return console.log(err);
  //
  //   closure(db);
  // });
};

//error handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

//response handling
let response = {
  status: 200,
  data: [],
  message: null
};

//get users
router.get('/users', (req, res) => {
  connection((db) => {
    db.collection('users')
      .find()
      .toArray()
      .then((users) => {
        response.data = users;
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});

module.exports = router;

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

const app = express();

app.use(bodyParser.json());

const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'todo';

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Connected to MongoDB: ${url}`);

  const db = client.db(dbName);
  const collection = db.collection('tasks');

  app.get('/tasks', (req, res) => {
    collection.find().toArray((err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send();
        return;
      }
      res.send(result);
    });
  });

  app.post('/tasks', (req, res) => {
    const task = req.body;
    collection.insertOne(task, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send();
        return;
      }
      res.send(result.ops[0]);
    });
  });

  app.put('/tasks/:id', (req, res) => {
    const id = new mongodb.ObjectID(req.params.id);
    const task = req.body;
    collection.findOneAndUpdate({ _id: id }, { $set: task }, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send();
        return;
      }
      res.send(result.value);
    });
  });

  app.delete('/tasks/:id', (req, res) => {
    const id = new mongodb.ObjectID(req.params.id);
    collection.deleteOne({ _id: id }, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send();
        return;
      }
      res.send();
    });
  });

  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
});

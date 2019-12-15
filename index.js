const express = require("express");
const app = express();
const MONGO_STRING = require("./config");
//Static Asset Declaration
app.use(express.static(__dirname + "/public"));

//Database
let MongoClient = require("mongodb").MongoClient;
let url = MONGO_STRING.MONGO_STRING || process.env.MONGO_STRING;
const DbName = "states";

app.locals.db;

//connecting to DataBase
MongoClient.connect(
  url,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  function(err, client) {
    if (err) throw err;
    console.log("DB connected");
    db = client.db(DbName);
  }
);

//port
const port = process.env.PORT || 3000;

//starting Server
app.listen(port);
console.log("play it on port : " + port);

app.get("/findFrequentState", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/api", (req, res) => {
  res.sendFile(__dirname + "/public/api.html");
});

app.put("/state/:state/add/:city", (req, res) => {
  db.collection("statesCollection").updateOne(
    { state: req.params.state },
    { $push: { cities: req.params.city } },
    (error, result) => {
      if (error) throw error;
      else {
        db.collection("statesCollection").findOne(
          { state: req.params.state },
          (err, result) => {
            if (err) throw err;
            else res.send(result);
          }
        );
      }
    }
  );
});

app.delete("/state/:state/remove/:city", (req, res) => {
  db.collection("statesCollection").updateOne(
    { state: req.params.state },
    { $pull: { cities: req.params.city } },
    (error, result) => {
      if (error) throw error;
      else {
        db.collection("statesCollection").findOne(
          { state: req.params.state },
          (err, result) => {
            if (err) throw err;
            else res.send(result);
          }
        );
      }
    }
  );
});

app.get("/showAllCities/:initial", (req, res) => {
  let target = [];
  db.collection("statesCollection")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      else {
        result.map(val => {
          val.cities.map(city => {
            if (city[0] === req.params.initial) target.push(city);
          });
        });
        res.send(target.sort());
      }
    });
});

app.get("/state/:city", (req, res) => {
  db.collection("statesCollection").findOne(
    { cities: req.params.city },
    (err, result) => {
      if (err) throw err;
      else res.send(result.state);
    }
  );
});

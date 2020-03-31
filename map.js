const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const url = "mongodb://localhost:27017/db";
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.get('/', function(req, res) {
  res.sendFile(__dirname + '\\index.html');
});
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    const appRouter = function (app) {
        app.get("/data", function (req, res) {
        db.collection("crawl").find().toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
        });
        });
    }



  appRouter(app);
  app.listen(3000, function () {
    console.log("app running on port 3000");
  });

});
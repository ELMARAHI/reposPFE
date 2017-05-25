// MEAN Stack RESTful API Tutorial - Contact List App

var express = require('express');
var app = express();
var mongojs = require('mongojs');
//var db = mongojs('mongodb://1234567:xM3e08hzsyOTo2gADYrrqglxAr1mGtcXvD0kyMBYGGlQZEjAEctsSB6pRiSR9OHvfb5bFhpgYtdLRR2MlAJGXA==@1234567.documents.azure.com:10250/?ssl=true', ['Location']);
var bodyParser = require('body-parser');
var db = mongojs('localhost:27017/LocationDB', ['Location']);


app.use(express.static(__dirname + '/geoApp/www'));
app.use(bodyParser.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/locationlist/:cas/:a/:b/:c/:d', function (req, res) {
  var cas = req.params.cas;

  if (cas == 0) {
    var ville = req.params.a;
    var bank = req.params.b;
    console.log(ville);


    db.Location.find({ "properties.ville": ville, "properties.groupeb": bank }, function (err, doc) {
      res.json(doc);
      console.log(doc);
    });
  }
  if (cas == 1) {
    var rayon = Number(req.params.a) / 1000;
    var r=rayon/6371.1;
    var positionlng = Number(req.params.b);
    var positionlat = Number(req.params.c);
    var bank = req.params.d;

    console.log(rayon);
    console.log(positionlng);
    console.log(positionlat);
    console.log(bank);
    console.log(r);


    db.Location.find({ $and: [{ geometry: { $geoWithin: { $centerSphere: [[positionlng, positionlat], r] } } }, { "properties.groupeb": bank }] }, function (err, doc) {
      res.json(doc);

      console.log(doc);
    });
  }

  if (cas == 2) {
    var positionlng = Number(req.params.b);
    var positionlat = Number(req.params.c);
    db.Location.find({ geometry: { $geoWithin: { $centerSphere: [[positionlng, positionlat], 0.0002] } } }, function (err, doc) {
      res.json(doc);
      console.log(doc);
    });

  }

});




app.put('/locationlist/:id', function (req, res) {
  var id = req.params.id;
  var problemecg = req.body.problemeCG;
  var problemefond = req.body.problemeFond;
  var problememat = req.body.problemeMateriel;
  var autre = req.body.autreProbleme;
  var status = req.body.status;

  console.log(id);
  console.log(problemecg);
  console.log(problemefond);
  console.log(problememat);
  console.log(autre);
  console.log(status);
  var now = new Date();

  var annee = now.getFullYear();
  var mois = '0' + (parseInt(now.getMonth()) + 1);
  var jour = ('0' + now.getDate()).slice(-2);
  var heure = ('0' + now.getHours()).slice(-2);
  var minute = ('0' + now.getMinutes()).slice(-2);
  var seconde = ('0' + now.getSeconds()).slice(-2);
  var dateActuelle = annee + "-" + mois + "-" + jour + " " + heure + ":" + minute + ":" + seconde;

  console.log(dateActuelle);


  db.Location.update({ "_id": id }, {
    "$set": { "properties.statusActuel": { "status": status, "date": dateActuelle } }, "$push": {


      "properties.problemes":
      {
        "_id": "new ObjectId()",
        "status": status,
        "problemeCG": problemecg,
        "problemeFond": problemefond,
        "problemeMateriel": problememat,
        "autreProbleme": autre,
        "date": dateActuelle

      }


    }
  }, function (err, doc) {
    res.json(doc);


  });

});

app.listen(3000);
console.log("Server running on port 3000");
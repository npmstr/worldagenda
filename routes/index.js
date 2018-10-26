var express = require('express');
var router = express.Router();

var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keykZDdy48wboYjYZ'
});
var base = Airtable.base('appTwRhs5DXU070nz');

var sessions = [];

base('Sessions').select({
    maxRecords: 50,
    view: "All Sessions"
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.
    records.forEach(function(record) {
      console.log(record);
        var cleanTitle = record.get('Title').replace(/(\r\n\t|\n|\r\t)/gm,"");
        sessions.push({
          "title": cleanTitle,
          "sessionType": record.get('Session Type'),
          "mkOwner": record.get('MK Owner')
        });
        console.log(sessions)
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});



/* GET home page. */
router.get('/', function(req, res, next) {
  sessionsString = JSON.stringify(sessions);
  res.render('index', {
    title: 'World 2019 Agenda',
    sessions: sessionsString
  });
});

module.exports = router;

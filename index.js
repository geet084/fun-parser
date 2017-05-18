const express = require('express');
const app = express();
const cors = require('express-cors');
const bodyParser = require('body-parser');
const uuid = require('uuid/v1');
// const logger = require('express-logger');
// const locus = require('locus');

const EventTags = require('./pullTags.js');
const eventTags = new EventTags();
const pullTags = eventTags.pullTags;

app.use(cors());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('port', process.env.PORT || 3001);
app.locals.title = 'Fun-Parser';
app.locals.events = [];

app.get('/events', (request, response) => {
  response.send(app.locals.events);
});

app.post('/events', (request, response) => {
  const event = request.body;
  if(!event ||!event.description || !event.name){
    return response.status(422).send({
      error: 'You are missing name or description or both!'
    });
  }
  event.tags = pullTags(event.description);
  event.id = uuid();
  app.locals.events.push(event);
  return response.status(201).send(event);
});

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app;
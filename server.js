const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const RTokenAnalytics = require('rtoken-analytics');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-config.json');

const analytics = new RTokenAnalytics();

var app = express();
app.set('port', 3001);
if (process.env.NODE_ENV === 'production') {
  app.set('port', 4001);
}

app.use(bodyParser.json());

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/v1/outgoing', async (req, res) => {
  try {
    const owner = req.query.owner;
    let outgoing = await analytics.getAllOutgoing(owner);
    res.send(outgoing);
  } catch (err) {
    res.status(500).send(`Error fetching data: "${err}"`);
  }
});
app.get('/v1/incoming', async (req, res) => {
  try {
    const owner = req.query.owner;
    let incoming = await analytics.getAllIncoming(owner);
    res.send(incoming);
  } catch (err) {
    res.status(500).send(`Error fetching data: "${err}"`);
  }
});
app.get('/v1/interestSent', async (req, res) => {
  try {
    const from = req.query.from;
    const to = req.query.from;
    let interest = await analytics.getInterestSent(from, to);
    console.log(interest);
    res.send(interest.toString());
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error fetching data: "${err}"`);
  }
});

app.listen(app.get('port'), () => {
  console.log(
    `_______________________________________________________________\n`
  );
  console.log(`################# rToken API Server ####################\n`);
  console.log(`Started on port ${app.get('port')}`);
  console.log(`______________________________________________________________`);
});
module.exports = { app };

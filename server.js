const express = require('express');
require('dotenv').config();
const _ = require('lodash');
const bodyParser = require('body-parser');
const RTokenAnalytics = require('rtoken-analytics');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-config.json');

const options = {
  infuraEndpointKey: process.env.INFURA_ENDPOINT_KEY
};
const analytics = new RTokenAnalytics(options);
var app = express();
app.set('port', 3001);
if (process.env.NODE_ENV === 'production') {
  app.set('port', 4001);
}

app.use(bodyParser.json());

app.get('/v1/allOutgoing', async (req, res) => {
  try {
    const owner = req.query.owner;
    let outgoing = await analytics.getAllOutgoing(owner);
    res.send(outgoing);
  } catch (err) {
    res.status(500).send(`Error fetching data: "${err}"`);
  }
});
app.get('/v1/allIncoming', async (req, res) => {
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
    const to = req.query.to;
    let interest = await analytics.getInterestSent(
      from.toLowerCase(),
      to.toLowerCase()
    );
    res.send(interest.toString());
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error fetching data: "${err}"`);
  }
});
app.get('/v1/receivedSavingsOf', async (req, res) => {
  try {
    const owner = req.query.owner;
    let savings = await analytics.receivedSavingsOf(owner.toLowerCase());
    res.send(savings.toString());
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error fetching data: "${err}"`);
  }
});
app.get('/v1/receivedSavingsOfPerHat', async (req, res) => {
  try {
    const hatID = req.query.hatID;
    let savings = await analytics.receivedSavingsOfPerHat(hatID);
    res.send(savings.toString());
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error fetching data: "${err}"`);
  }
});
app.get('/v1/amountEarnedPerHat', async (req, res) => {
  // !! Danger: this does not track which has been withdrawn by the recipient
  try {
    const hatID = req.query.hatID;
    let earned = await analytics.amountEarnedPerHat(hatID);
    res.send(earned.toString());
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error fetching data: "${err}"`);
  }
});

var swaggerOptions = {
  customCssUrl: './swagger.css'
};

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

app.listen(app.get('port'), () => {
  console.log(
    `_______________________________________________________________\n`
  );
  console.log(`################# rToken API Server ####################\n`);
  console.log(`Started on port ${app.get('port')}`);
  console.log(`______________________________________________________________`);
});
module.exports = { app };

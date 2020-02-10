const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const RTokenAnalytics = require('rtoken-analytics');

const analytics = new RTokenAnalytics();

var app = express();
app.set('port', 3001);
if (process.env.NODE_ENV === 'production') {
  app.set('port', 4001);
}

app.use(bodyParser.json());

app.get('/outgoing', async (req, res) => {
  const owner = req.body.owner;
  let outgoing = await analytics.getAllOutgoing(owner);
  res.send(outgoing);
});
app.get('/incoming', async (req, res) => {
  const owner = req.body.owner;
  let incoming = await analytics.getAllIncoming(owner);
  res.send(incoming);
});
app.get('/interestSent', async (req, res) => {
  const from = req.body.from;
  const to = req.body.from;
  let interest = await analytics.getInterestSent(from, to);
  res.send(interest);
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

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

app.get('/', async (req, res) => {
  let outgoing = await analytics.getAllOutgoing(
    '0x9492510bbcb93b6992d8b7bb67888558e12dcac4'
  );
  res.send(outgoing);
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

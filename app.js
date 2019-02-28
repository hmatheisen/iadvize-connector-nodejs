const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { iadvizeRoutes } = require('./routes');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('assets'));
app.use('/api/iadvize', iadvizeRoutes);

module.exports = app;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { iadvizeRoutes } = require('./routes');

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Body Parser allow JSON and urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Static content
app.use(express.static('assets'));
app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile('static/index.html')
})

// Routes
app.use('/api/iadvize', iadvizeRoutes);

module.exports = app;

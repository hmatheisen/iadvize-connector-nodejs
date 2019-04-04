const app = require('./app');
const port = 8080;

app.listen(8080, () => {
  console.log("Server is listening on port : " + port);
});

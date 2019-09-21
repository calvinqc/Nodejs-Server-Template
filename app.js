import express from 'express';

const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get('/', function (req, res) {
  res.render('index');
});

app.listen(8080, () => {
  console.log('Example app listening on port 8080!');
});
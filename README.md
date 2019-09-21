# Calvin.qc Project & How to create a node app from scratch with ES6, Babel and ESlint Airbnb

Install Node.js for your platform (MacOS, Windows or Linux)

`npm init`
change index.js to app.js
create files: app.js, README.md, .gitignore

use Babel and eslint airbnb

1. Eslint Airbnb
   `npx install-peerdeps --dev eslint-config-airbnb`
   Add "extends": "airbnb" to your .eslintrc
2. Babel
   a. `npm install esm babel-cli babel-register babel-preset-es2015 babel-preset-stage-2 babel-core babel-polyfill --save-dev`
   b. create .babelrc
   c. add
   `{ "presets": ["es2015", "stage-2"] }`

## Getting Started

run `npm i --save express esm ejs`

in app.js:

```
import express from 'express';

const app = express();

app.get('/', function (req, res) {
  res.status(200).json({
    status: 'success',
  })
});

app.listen(8080, () => {
  console.log('Example app listening on port 8080!');
});
```

Open package.json, add this to "script":
`"start": "node -r esm app.js",`
`"dev": "nodemon -r esm app.js",`

go to .gitignore and add `node_modules` and `package-lock.json`

Start adding the first view:

1. create
   in app.js:

```
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get('/', function (req, res) {
  res.render('index');
});
```

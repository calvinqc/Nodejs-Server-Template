# Build A Web App using M.E.R.N Stack with ES6

> This is my personal website built using MongoDB, Express.js, React.js, and Node.js (MERN). This project serves as a guide/template to help you to get started with Web Development, it contains 2 parts:
> 1. Built your simple __SERVER__ App with NodeJS/ExpressJS.
> 2. Built your full-stack ReactJS app with your SERVER from (1).

# Requirement

- [Node.js](https://nodejs.org/en/) 
- [npm registry](https://www.npmjs.com/).
- [Github](https://gist.github.com/derhuerst/1b15ff4652a867391f03)
- Text Editor: [VSCode](https://code.visualstudio.com/) OR ...anything you like.
- [Postman](https://www.getpostman.com/): this will allow you test your API (GET, POST, PUT, DELETE, etc.)

# Getting Started

Open your Terminal and redirect you to the directory where you want to place your project:

```sh
$ mkdir server && mkdir client && cd server/
```

Create a file `package.json` and add the below code. 

```sh
$ touch package.json
```

This is where you store all the project dependencies, and scripts to start your application

```javascript
{
  "name": "server",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "node -r esm app.js",
    "dev": "nodemon -r esm app.js"
  },
}
```

# Install

## ESLint Airbnb

**Install [ESLint airbnb](https://github.com/airbnb/javascript)** to allow all developers have the same coding style and follow a good Javascript coding style

```sh
$ npx install-peerdeps --dev eslint-config-airbnb
```

Create `.eslintrc` in your project and add this:

```javascript
{
  "extends": "airbnb"
}   
```

## Babel

**Install [Babel](https://babeljs.io/)**: This compiles ES6 to ES5 to compress the project size when push to production to reduce run-time and because many web browser can only read ES5.

```sh
$ npm install esm babel-cli babel-register babel-preset-es2015 babel-preset-stage-2 babel-core babel-polyfill --save-dev
```

Create `.babelrc` in your project and add this:

```javascript
{
  "presets": ["es2015", "stage-2"]
}
```

## Express Middleware

Install the first 3 middleware to run your App:

```sh 
$ npm i --save express esm nodemon
``` 
1. [express](): important framework for NodeJS to start a server project.
1. [esm](https://github.com/standard-things/esm): This go with `babel` and allows you to run ES6.
2. [nodemon](https://nodemon.io/): This is my favorite, it allows you to re-start automatically the server whenever you make changes in the server.

# Build your Server

The first step is to create a file that will contain our code for Node.js Server

```sh
$ touch app.js
```

This `app.js` will start a server on PORT 8080 and initiliaze all the dependences that your app requires. Add this simple code to app.js

```javascript
// Import all dependencies & middleware here
import express from 'express';

// Init an Express App. This later starts a server and put all dependencies into your project to use
const app = express();

// Use your dependencies here

// use all controllers(APIs) here
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success'
  });
});

// Start Anything here
app.listen(8080, () => {
  console.log('Example app listening on port 8080!');
});
```
## Start your Server

You can find the script that run these functions in `package.json`

```sh
$ npm start
```

OR (To run automatically whenever you make a new changes, run used by `Nodemon`)

```sh
$ npm run dev
```

# Use Dependencies/Middleware

Express is a framework, but it doesn't mean that it contains all you need to make a great web app. Then, you'll need to import more powerful libraries.

An example is [body-parser](https://github.com/expressjs/body-parser):

```sh
$ npm i body-parser
```

Import this to `app.js`:

```javascript
import bodyParser from 'body-parser';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
```

# Create RESTful APIs

Now, your project is getting complicated, and you don't want to put all your API into `app.js`, which is used only for starting & initializing your app.

You want to separate your APIs into different folders. Run the following commands:

```sh
$ mkdir controller 
$ touch controller/index.js && touch controller/user.controller.js
```

Open your `user.controller.js` and import this code in there:

```javascript
import express from 'express';

const userController = express.Router();

userController.get('/', (req, res) => {
  res.status(200).json({
    status: 'success'
  });
});

export default userController;
```

Basically, __Express__ router is a class which helps us to create router handlers. It also can extend this routing to handle validation, handle 404 or other errors, etc.

## Scalability

Assume your project has many controllers. You don't want to keep importing all controllers to your `app.js`. Then, you want to use 1 file to import all controllers.

Open `index.js` in your controller and import this:

```Javascript
import userController from './user.controller';
//import abcController from './abc.controller';
//import xyzController from './xyz.controller';

export {
  userController,
  //abcController,
  //xyzController
};
```

Right now, you only have userController, but if you have more controllers, just un-comment the import and export. 

#### NOTE: the comments are just examples.

## Adding API to Express App

You just created the Controller but you haven't told Express App to __use__ it. 

In `app.js`, first import Controllers: 

```javascript
import { 
  userController, 
  //abcController, 
  //xyzController 
} from './controller';
```

Replace this:

```javascript
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success'
  });
});
```

with this:

```javascript
app.use('/', userController);
//app.use('/abc', abcController);
//app.use('/xyz', xyzController);
```

# Database

You can choose any Database Language to learn, and apply. In this project, I will use [MongoDB](https://www.mongodb.com/) as it has a good library to interact with NodeJS. 

## Install & Start MongoDB

You will need to install [Mongoose](https://docs.mongodb.com/manual/installation/): "Mongoose provides a straight-forward, schema-based solution to model your application data."

Open a new terminal:

```sh
$ brew update
$ brew tap mongodb/brew
$ brew install mongodb-community@4.2
```

Open your previous terminal:

```sh
$ npm i mongoose
```

## Connection

In your `app.js`, import mongoose:

```javascript
import mongoose from 'mongoose';
```

And add:

```javascript
app.listen(8080, () => {
  console.log(`Started successfully server at port ${port}`);
  mongoose.connect('mongodb://localhost/test').then(() => {
    console.log(`Conneted to mongoDB at port 27017`);
  });
});
```

## Schema

```sh
$ mkdir database && mkdir database/models && mkdir database/schemas
$ touch database/schemas/user.schema.js
$ npm i sha256
```

Frist, create the schema, and initialize all the atrributes for that object in the database. 

For ex: User schema will have 2 attributes: __email__ & __hashedPassword__.

Open `user.schema.js`:

```javascript
import { Schema } from 'mongoose';
import sha256 from 'sha256';

const userSchema = new Schema({
  hashedPassword: { type: String, required: true },
  email: { type: String, required: true },
});

/**
 * @param {*} password
 */
userSchema.methods.comparePassword = function comparePassword(password) {
  return this.hashedPassword === sha256(password);
};

export default userSchema;
```

## Models

Then, you want to create a model for that each schema you create and add them into `index.js` (so you only need to call one file):

```sh
$ touch database/models/user.model.js
```

Open `user.model.js`:

```javascript
import mongoose from 'mongoose';
import userSchema from '../schemas/user.schema';

const User = mongoose.model('User', userSchema);
export default User;
```

Open `models/index.js`:

```javascript
import User from './user.model';

export {
  User,
};
```

# Save data using API

Open `controller/user.controller.js`.

Import User & __replace__ `userController.get('/', ...)` with these 2 new APIs(Endpoints):

```javascript
import { 
  User
} from '../database/models';

import sha256 from 'sha256';

/**
  * GET/
  * retrieve and display all Users in the User Model
  */
userController.get('/', (req, res) => {
  User.find({}, (err, result) => {
    res.status(200).json({
      data: result,
    })
  })
});

/**
  * POST/
  * Add a new User to your database
  */
userController.post('/add-user', (req, res) => {
  const { email, password } = req.body;
  
  const userData = {
    email,
    hashedPassword: sha256(password)
  }

  const newUser = new User(data);

  newUser
    .save()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});
```

# Testing

## Start Database:

```sh
$ mongod --config /usr/local/etc/mongod.conf
```

## Start server 

```sh
$ npm run dev
```

## Postman

Open Postman, if you don't know how to use it. Please watch this tutorial on [Youtube](https://www.youtube.com/watch?v=t5n07Ybz7yI). 

Use POST method and enter `localhost:8080/add-user`. This will call the "/add-user" API. 

Add this to your body:

```
{
  'email': 'calvin.nvqc@gmail.com',
  'password': '123456789'
}
```

Check if your user data is save to database, open Web Browser and enter `localhost:8080/`

Now, you're done! Congratulation on building your first API.

# Project Structure

```bash
server
└── controller      - Storing all APIs of the app including POST, PUT, DELETE
  ├── index.js
  └── user.controller.js
└── database 
  ├── model	    - store all the models of the project
  └──schema	    - create a schema(attribute of the model) for each model
├── global.js	    - storing your configuration attribute
├── .eslintrc	    - config ESLint Airbnb Coding Style
├── .babelrc        - migrate from ES6 to ES5 to run on different browsers
├── package.json    - config ESLint Airbnb Coding Style
└── App.js	    - Everything a server needs to start
```

# Client (React.js/ Redux)
> In process

# Start Application
In the root folder of your project. (If you're in a server project, run `cd ..`).

Then, create a `package.json`

```sh
$ touch package.json
```

```javascript
{
  "name": "your-project-name",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "i-client": "cd client/ && npm i",
    "i-server": "cd server/ && npm i",
    "i": "npm run i-client && npm run i-server",
    "client": "cd client/ && npm start",
    "server": "cd server/ && npm run dev",
    "start": "npm run client && npm run server"
  }
}
```

From your project's root folder, install all dependencies and devDependencies:

```sh
$ npm run i-server
```

Open web browser on `http://localhost:8080`

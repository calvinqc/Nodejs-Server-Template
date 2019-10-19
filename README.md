Build A Web App using M.E.R.N Stack with ES6

> This is my personal website built using ReactJS and NodeJS/ExpressJS. This project serves as a guide/template to help you to get started with Web Development, it contains 2 parts:
> 1. Built your simple __SERVER__ App with NodeJS/ExpressJS.
> 2. Built your full-stack ReactJS app with your SERVER from (1).

# Requirement

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).

Good to have:
- [Github](https://gist.github.com/derhuerst/1b15ff4652a867391f03)
- Text Editor: [VSCode](https://code.visualstudio.com/) OR ...anything you like.
- [Postman](https://www.getpostman.com/): this will allow you test your API (GET, POST, PUT, DELETE, etc.)

# Getting Started
> Step-by-step how to create an Express app from scratch so you'll know how all the files are related, and learn what each file does.

Open your Terminal and redirect you to the directory where you want to place your project:

```sh
$ mkdir server && mkdir client && cd server/
```

This will create(mkdir) a folder called "server" and "client" and re-direct(cd) to that folder. For now, we only focus to Server.

```sh
$ touch package.json
```

Create a file `package.json` and add the below code. 

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

**Install [ESLint airbnb](https://github.com/airbnb/javascript)**

Adding ESLint to allow all developers have the same coding style and follow a good Javascript coding style

```sh
$ npx install-peerdeps --dev eslint-config-airbnb
```

Create `.eslintrc` in your project and add this to your .eslintrc:

```javascript
{
  "extends": "airbnb"
}   
```

## Babel

**Install [Babel](https://babeljs.io/)** 

This compiles ES6 to ES5 to compress the project size when push to production to reduce run-time and because many web browser can only read ES5

```sh
$ npm install esm babel-cli babel-register babel-preset-es2015 babel-preset-stage-2 babel-core babel-polyfill --save-dev
```

Create `.babelrc` in your project and add this:

```javascript
{
  "presets": ["es2015", "stage-2"]
}
```

## Package.json 
You just created the Controller but you haven't told Express App to use it. 

Install the first 3 dependenceis:

```sh 
$ npm i --save express esm nodemon
``` 
1. [express](): important framework for NodeJS to start a server project.
1. [esm](https://github.com/standard-things/esm): This go with `babel` and allows you to run ES6.
2. [nodemon](https://nodemon.io/): This is my favorite, it allows you to re-start automatically the server whenever you make changes in the server.

# Our Server App

The first step is to create a file that will contain our code for Node.js Server

```sh
$ touch app.js
```

This `app.js` will start a server on PORT 8080 and initiliaze all the dependences that your app requires. Add this simple code to app.js

```javascript
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success'
  });
});

app.listen(8080, () => {
  console.log('Example app listening on port 8080!');
});
```

- `const app = express();` - Init an Express App. This later starts a server and put all dependencies into your project to use
- `app.get('/', (req, res) => {});` - create a `GET/` API
- `app.listen(8080, () => {})` - listen on `PORT: 8080`

Now, you can try and run your first simple app by run 

```sh
$ npm start
```

OR (To run automatically whenever you make a new changes)

```sh
$ npm run dev
```

# Using Dependencies/Middleware

Express is a framework, but it doesn't mean that it contains all you need to make a great web app. Then, you'll need to import more powerful libraries online.

Import this to `app.js`:

```javascript
import bodyParser from 'body-parser';
```

Now, as I said to think of your Express App as an object, after you import a library, you'll tell the app to use that library:

```javascript
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
```

# Create RESTful APIs

Now, your project is getting complicated, and you don't want to put all your API into `app.js`, which is used only for starting & initializing your app.

You want to separate your APIs into different folders. Run the following commands:

```bash
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

In more complex project, you might have other controller files for different type of API's purpose, might be `abc.controller.js`, `xyz.controller.js`.

## Index.js

For scalability, assume your project has many controllers. You don't want to keep importing all controllers to your `app.js`. Then, you want to use 1 file to import all controllers.

Open `index.js` in your controller and import this:

```Javascript
import userController from './user.controller';

export {
  userController,
  abcController,
  xyzController
};
```

## Adding Endpoint to Express App

You just created the Controller but you haven't told Express App to __use__ it. 

In `app.js`, add this:

```javascript
import { 
  userController, 
  abcController, 
  xyzController 
} from './controller';

app.use('/', userController);
app.use('/abc', abcController);
app.use('/xyz', xyzController);
```

# Database

You can choose any Database Language to learn, and apply. In this project, I will use [MongoDB](https://www.mongodb.com/) as it has a good library to interact with NodeJS. 

## Install

You will need to install [Mongoose](https://mongoosejs.com/): "Mongoose provides a straight-forward, schema-based solution to model your application data."

```sh
$ npm i mongoose mongodb
```

## Connection

In your `app.js`, add & modify:

```javascript
import mongoose from 'mongoose';

app.listen(8080, () => {
  logger.info(`Started successfully server at port ${port}`);
  mongoose.connect('mongodb://localhost/test').then(() => {
    logger.info(`Conneted to mongoDB at port 27017 at ${mongoHostName}`);
  });
});
```

## Schema

```sh
$ mkdir database && mkdir database/models && mkdir database/schemas
$ touch schemas/user.schema.js
$ npm i sha256
```

You first create the schema, and initialize all the atrribute for that Object in the database. For ex: User schema will have 2 attributes: `email` & `hashedPassword`.

Open user.schema.js:

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

Then, you want to create a model for that each schema you create and add them into index.js (so you only need to call one file):

```sh
$ touch models/index.js && touch models/user.model.js
```

Open user.model.js:

```javascript
import mongoose from 'mongoose';
import userSchema from '../schemas/user.schema';

const User = mongoose.model('User', userSchema);
export default User;
```

Open models/index.js:
```javascript
import User from './user.model';

export {
  User,
};
```

# Save data using API

Open `controller/user.controller.js`, add replace `userController.get('/', ...)` with these 2 new APIs(Endpoints):

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

Run your server 

```sh
$ npm run dev
```

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

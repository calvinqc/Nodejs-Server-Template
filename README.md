# Your First Web App using M.E.R.N Stack with ES6

> This is my personal website built using ReactJS and NodeJS/ExpressJS. This project serves as a guide/template to help you to get started with Web Development, it contains 2 parts:
> 1. Built your simple __SERVER__ App with NodeJS/ExpressJS.
> 2. Built your full-stack ReactJS app with your SERVER from (1).

## Table of Contents
- [Install](#install)
- [Introduction](#introduction)
- [Server](#server)	
	- [Project Structure](#project-structure)
	- [ESLint](#ESLint-Airbnb)
	- [Babel](#babel)
	- [Package.json](#package.json)
	- [App.js](#app.js)
	- [Using Dependencies](#using-dependencies)
	- [Controller(APIs)](#controller-(apis))
		- [Index.js](#index.js))
		- [API Uses](#api-uses)
	- [Database](#database)
	- [Project Structure](#project-structure)
	- [Starting Server](#start-application)
- [Client](#client)

## Install

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).

Good to have:
- [Github](https://gist.github.com/derhuerst/1b15ff4652a867391f03)
- Text Editor: [VSCode](https://code.visualstudio.com/) OR ...anything you like.

## Server
> Step-by-step how to create an Express app from scratch so you'll know how all the files are related, and learn what each file does.

### Project Structure
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

### ESLint Airbnb

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

### Babel

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

### Package.json 
You just created the Controller but you haven't told Express App to use it. 

Install the first 3 dependenceis:

```sh 
$ npm i --save express esm nodemon
``` 
1. [express](): important framework for NodeJS to start a server project.
1. [esm](https://github.com/standard-things/esm): This go with `babel` and allows you to run ES6.
2. [nodemon](https://nodemon.io/): This is my favorite, it allows you to re-start automatically the server whenever you make changes in the server.

### App.js

```sh
$ touch app.js
```

This `app.js` will start a server on PORT 8080 and initiliaze all the dependences that your app requires.

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

### Using dependencies

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

### Controller (APIs)

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

#### Index.js

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

#### Controller Uses

You just created the Controller but you haven't told Express App to use it. 

In `app.js`, add this:

```javascript
import { 
	userController, 
	studentController, 
	teacherController 
} from './controller';

app.use('/', userController);
app.use('/abc', abcController);
app.use('/xyz', xyzController);
```

## Database

You can choose any Database Language to learn, and apply. In this project, I will use [MongoDB]() as it has a good library to interact with NodeJS. 

### Install

You will need to install [Mongoose](https://mongoosejs.com/): "Mongoose provides a straight-forward, schema-based solution to model your application data."

```sh
$ npm i mongoose mongodb
```

### DB Connect

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

## Project Structure

```bash
server
├── controller      - Storing all APIs of the app including POST, PUT, DELETE
├── database        - 
	├── model       - including setup/schema/model of MySQL database
	├── schema		- including setup/schema/model of MySQL database
├── global.js		- config ESLint Airbnb Coding Style
├── .eslintrc		- config ESLint Airbnb Coding Style
├── .babelrc        - migrate from ES6 to ES5 to run on different browsers
├── package.json    - config ESLint Airbnb Coding Style
└── App.js			- Everything a server needs to start
```

## Start Application
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

Now, run you server: `npm run server` -> open web browsern on `http://localhost:8080`


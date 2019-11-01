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

# Part 1: Build your Server API.

For a full instruction, please read this [Medium post](https://medium.com/@calvinqc/a-complete-guide-build-a-scalable-3-tier-architecture-with-mern-stack-es6-ca129d7df805)

# Part 2: Build your Client UI (React.js/ Redux)
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

Open Server on `http://localhost:8080`
Open Client on `http://localhost:5000`

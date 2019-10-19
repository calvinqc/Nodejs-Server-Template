// import all dependencies & files here
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import { userController } from "./controller";

// Init Express App
const app = express();

// Use all dependencies for your Express App
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use all your controllers(API) here
app.use("/", userController);

// Start Anything here
app.listen(process.env.PORT || 8080, () => {
  console.log("Example app listening on port 8080!");
  mongoose.connect("mongodb://localhost/test").then(() => {
    console.log(`Conneted to mongoDB at port 27017`);
  });
});

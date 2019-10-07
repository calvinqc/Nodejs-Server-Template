import express from "express";

const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/projects", (req, res) => {
  res.send("Stay tune for upcoming update");
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Example app listening on port 8080!");
});

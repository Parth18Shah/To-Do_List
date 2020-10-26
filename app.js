const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

var app = express();

var path = require("path");
const userRoutes = require("./routes/user");

app.use("/static", express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(userRoutes);

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/todo",function(err,res){
  if (err) console.log(err);
  console.log("Connected");
  app.listen(3000);
});
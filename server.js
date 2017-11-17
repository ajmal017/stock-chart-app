const express = require("express");
const app = express();
const socket = require("socket.io");
require('dotenv').config()

const request = require("request");

const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const Db = require("./db/db.js");

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "/dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/index.html"))
});


const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log("server online at port ", port);
});


const io = socket(server);
// TLE BOMO DELALI DANES
io.on("connection", (socket) => {
  console.log("hello client id: ", socket.id);

  socket.on("get-data", (message) => {
    console.log("activity?");
    Db.findAll((err, data) => {
      if (err) {
        console.log(err);
      }
      socket.emit("get-data", data)
      // send an list from here to update....
    })

  })

  socket.on("add-new", (seriesObj)=> {
    console.log("recieving", seriesObj.color);

    Db.createOne( seriesObj.name, seriesObj.data, seriesObj.color, (err,data)=> {
         if(err) {
           console.log(err);
         }
         console.log("done writeing");
         // written a new entry to the db
       })
  })

  socket.on("delete-one", (innerHTML)=> {
    console.log("innerHTMl", innerHTML);
    Db.deleteOne(innerHTML, (err,data)=> {
      if(err) {
        console.log(err);
      }
      console.log("Deleted:");
    });
  })
  
});


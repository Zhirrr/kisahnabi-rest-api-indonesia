const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const http = require("http");
const https = require("https");
const path = require("path")
const KisahNabi = require('../utils')

http.globalAgent.maxSockets = Infinity;
https.globalAgent.maxSockets = Infinity;

app.use(cors());

app.get("/", (req, res) => {
  setImmediate(() => {
    try {
      res.setHeader("Cache-Control", "public,max-age=0");
      res.sendFile(path.join(__dirname, "../index.html"));
    } catch (e) {
      res.status(400).send("Something went wrong");
    }
  });
});

app.get("/api/searchnabi", (req, res) => {
    const nabi = req.query.q
    res.setHeader("Cache-Control", "public,max-age=3600,s-maxage=30");
    setImmediate(() => {
      try {
        if(nabi == '' || nabi == null){
          res.status(400).send({
            code: res.statusCode,
            success: false,
            message: "Query Gak Boleh Kosong!",
            creator: "Zhirrr"
          });
        }else{
          KisahNabi.searchNabi(nabi)
            .then((data) => {
              res.json(data);
            })
            .catch((err) => console.log(err));
        }
      } catch (e) {
        res.status(400).send("Server Bermasalah Gan");
      }
    });
});

app.use(express.urlencoded({ extended: false }));
app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});

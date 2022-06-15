const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path')

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

require('dotenv').config()

const uri = process.env.ATLAS_URI;

mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology:true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection success')
})


if (process.env.NODE_ENV === "production") {
    // Serve any static files
    app.use(express.static(path.join(__dirname, "client/build")));
    // Handle React routing, return all requests to React app
    app.get("/", function (req, res) {
      res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });
  }

const projectsRouter = require('./routes/projects.js')
app.use('/Projects', projectsRouter)

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  });


app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

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

const projectsRouter = require('./routes/projects.js')
app.use('/Projects', projectsRouter)

app.get('/', (req,res,next) => {
    res.status(200).json({
        status:'success',
        data:{
            name: 'react-keep-clone',
            version:'0.1.0'
        }
    })
})


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
}

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})



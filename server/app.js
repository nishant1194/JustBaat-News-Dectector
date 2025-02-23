const express = require('express') ;
const app = express() ;
const mongoose = require('mongoose') ;
 const cors = require('cors')
const bodyPareser = require('body-parser');
const {urlencoded, json} = require('body-parser') ;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/AuthRoute.js');
const searchRoutes = require('./routes/SearchRoutes.js');


async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb+srv://nishantkumar32435:FakeNewsJustBaat@cluster0.bidls.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/');
      console.log('Connected to the database');
    } catch (err) {
      console.error('Database connection failed', err);
    }
  }
connectToDatabase() ;

app.use('/api/auth', authRoutes);
app.use('/api/search', searchRoutes);

app.get('*',(req,res)=>{
    res.status(200).json({
      message:'received request'
    })
  })
  
  
  
  module.exports = app ;
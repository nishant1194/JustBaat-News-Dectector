const mongoose = require('mongoose') ;


 const connectToDatabase = async () => {
    try {
        console.log(' to the database');

      await mongoose.connect('mongodb+srv://nishantkumar32435:mernauth1cluster0.heovq.mongodb.net/');
      console.log('Connected to the database');
    } catch (err) {
      console.error('Database connection failed', err);
    }
  }

  module.exports =  connectToDatabase;  
 
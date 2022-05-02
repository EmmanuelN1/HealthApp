const mongoose = require('mongoose');

//Creation Of Schema
let patientSchema = new mongoose.Schema({
    fname:{ 
       type: String,
        required: true
    },
    lname:{ 
        type: String,
         required: true
     },
     mobile:{ 
        type: String,
         required: true
     },
     email:{ 
        type: String,
         required: true
     },
     city:{ 
        type: String,
         required: true
     },
     state:{ 
        type: String,
         required: true
     },
     country:{ 
        type: String,
         required: true
     },

     multisymptoms:{ 
        type: String,
         required: true
     },

     diseaseSelect:{ 
        type: String,
         required: true
     }
    
})


module.exports = mongoose.model('Patient', patientSchema)
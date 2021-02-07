const mongoose = require("mongoose");
const validator = require("validator");
const uniqueValidator = require('mongoose-unique-validator');



const parameterSchema = new mongoose.Schema(
    {device_name:
        {type:String,
        required:true
    },
    parameters:
        {type:String,
        required:true,
        //  unique:true
    },
    unit:
        {type:String,
        required:true,
        // unique:true
    },

    Date : { type : Date, default: Date.now }},{versionKey:false});
    parameterSchema.plugin(uniqueValidator);


const Parameter = new mongoose.model('device_parameter',parameterSchema);
module.exports = Parameter;

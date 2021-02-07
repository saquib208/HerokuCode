const mongoose = require("mongoose");
const validator = require("validator");
const uniqueValidator = require('mongoose-unique-validator');

const device_typeSchema = new mongoose.Schema({
       device_desc:{type:String,
        required:true,
        unique:true
        },
    device_name:{type:String,
        required:true,
        unique:true
        },
    device_code: {type: String,
        required:true}
    },
{versionKey:false});




device_typeSchema.plugin(uniqueValidator);

const Device_Type = new mongoose.model('Device_Type',device_typeSchema);

module.exports = Device_Type;





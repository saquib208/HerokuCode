const mongoose = require("mongoose");
const validator = require("validator");
// const uniqueValidator = require('mongoose-unique-validator');



const add_devicesSchema = new mongoose.Schema(
{
        device_id:
        {type:String,
        
    },
    serial_no:
        {type:String,
        required:true
        
    },
    parameters:[],
    location  : [],

    Date : { type : Date, default: Date.now }},{versionKey:false});
//     parameterSchema.plugin(uniqueValidator);


// const Device_Info = new mongoose.model('Device_Info',add_devicesSchema,'Device_Info');
// module.exports = Device_Info;

const Device_Info = new mongoose.model('Device_Info',add_devicesSchema,'Device_Info');
module.exports = Device_Info;

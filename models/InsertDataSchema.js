const mongoose = require("mongoose");
const moment = require('moment')




const insertDataSchema = new mongoose.Schema(
    {client_time : {type: Date},
    server_time :  { type : Date, default: moment() }
    // parameters:
    //     {type:String,
    //     required:true,
    //     //  unique:true
    // },
    // unit:
    //     {type:String,
    //     required:true,
    //     // unique:true
    // },

    },{strict:false,versionKey:false});
    

const deviceData = new mongoose.model('GWR00004',insertDataSchema);
//module.exports = deviceData;

const express = require("express");
const bodyParser = require("body-parser")
const Device_Type = require("../models/DeviceTypesSchema");
const router = new express.Router();
const Parameter = require("../models/parametersSchema")
const Device_Info = require("../models/AddDevicesSchema")
const mongooseUniqueValidator = require("mongoose-unique-validator");
var jsonParser = bodyParser.json()
require('dotenv').config()
//var url = "mongodb://localhost:27017/";
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@devicedb.9k0qp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

//var url = 'mongodb+srv://admin:mongodb@devicedb.9k0qp.mongodb.net/DEVICEDB?retryWrites=true&w=majority'
var DB_NAME = `${process.env.DB_NAME}`

var MongoClient = require('mongodb').MongoClient;



router.post("/insertData/:id", jsonParser, async (req,res)=>{
  
try {

  
  deviceID =  req.params.id
  deviceType = deviceID.substring(0,3)
  var data = req.body

  const deviceData = await Device_Info.find({device_id:deviceID},{_id:0})
  const parameterData = await Parameter.find({device_name: deviceType})
  
  
  var param = []
  for(i = 0; i < parameterData.length; i++) {
    var para1 = parameterData[i];
   
   param.push(para1._doc.parameters)
  
  
}


const intersection = param.filter(element => Object.keys(data).includes(element));

  if(deviceData.length == 0)
  {
    return res.status(404).json({message:"Device doesn't exist"})
  }

  else if (intersection.length == 0){
    return res.status(404).json({message:"Provided parameter dosen't exists in db"})

  }
 else{

 
  var date = data.client_time;
  var dateObject = new Date(date);
  var client_time = {"client_time":dateObject} 
  const db = MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
    useUnifiedTopology: true
    if (err) throw err;
    var dbo = db.db(DB_NAME);
    var myobj = []
    myobj.push(data)
    var device_name ={ "device_id" : deviceID}
    dbo.collection(deviceID).insertOne({...device_name,...data,...client_time,"server_time": new Date},{safe:true},function(err, result) 
    {
      if (err) throw err;
      
      res.status(201).json(data)

      db.close();
    

    });
  });
  
}


}

    
catch(err)
{
  res.send(err)
}
})


router.get("/getData/:id",async(req,res)=>{
  try{
      deviceSchema  =  req.params.id
      const deviceData = await Device_Info.find({device_id:deviceSchema},{_id:0})
    
      if(deviceData.length == 0)
      {
        return res.status(404).json({message:"Device doesn't exist"})
      }

      else 
      {


      const db = MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db) {
        useUnifiedTopology: true
        if (err) throw err;
        var dbo = db.db(DB_NAME);
        var data = dbo.collection(deviceSchema).find({},{_id:0}).toArray(function(err, result) {
          if (err) throw err;
          //console.log(result);
          res.status(200).json(result)
          db.close();
        });
      });
  }
  
}
  
  catch(e){
      res.send(e);
  }
})


module.exports = router;
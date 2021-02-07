const express = require("express");
const router = new express.Router();
const Device_Type = require("../models/DeviceTypesSchema")
const moment = require('moment')

// const Parameter = require("../models/parameters")

router.post("/addDeviceTypes", async (req,res)=>{
  // var count= await promise.then(result => {result+1})
  const device_types = new Device_Type({  
    device_desc : req.body.device_desc,
    device_name: req.body.device_name,
    device_code :"00"+await Device_Type.count((err ,result)=> {result+1})
})
 
try{ const devType= await device_types.save()
  //res.setHeader('Content-Type', 'application/json')
  res.status(201).json({device_desc : devType.device_desc, device_name : devType.device_name, device_code : devType.device_code})
}
catch(err)
  {
    res.status(400).json({message:"Device already exist"})
  }
})

router.get("/getDeviceTypes",async(req,res)=>{
   try{
       const device_typeData = await Device_Type.find({}, {_id:0}).sort({_id:-1});
       //console.log(moment())
       res.send(device_typeData);
   }catch(e){
       res.send(e);
   }
 })



module.exports = router;
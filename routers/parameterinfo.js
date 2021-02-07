const express = require("express");
const Device_Type = require("../models/DeviceTypesSchema");
const router = new express.Router();
const Parameter = require("../models/parametersSchema")



  router.post("/parameters", async(req, res) =>{
    try{
      const device_name = req.body.device_name
      // console.log(typeof(device_name))
      const paraData = await Device_Type.findOne({device_name:device_name})
      // console.log(paraData);
      if(!paraData)
      {
        return res.status(404).json({message:"Device doesn't exist"})
      }else{
        
        const user = await Parameter(req.body)
        //console.log(user)
        user.save()
        res.setHeader('Content-Type', 'application/json')
        res.status(201).json(({device_name : user.device_name, parameter : user.parameters, unit : user.unit}))
      }
    }catch(e){
      res.status(400).json({

        "Message": "Invalid Request Parameter"
      })
    }
   })
 

  
  
   router.get("/parameters/:device_name", async(req, res) =>{
    try{
      device_type = req.params.device_name
      const paramData = await Parameter.findOne({device_name: device_type})
      var data = []
      var  data1 = []
      const parameterData = await Parameter.find({device_name: device_type})
      const unitData = await Parameter.find({device_name: device_type})
      if(!paramData)
      {
        return res.status(404).json({message:"Device doesn't exist"})
      }
      else{
      for(i = 0; i < parameterData.length; i++) {
          var para1 = parameterData[i];
         // console.log(para)
         data.push(para1._doc.parameters)
        // data.push(para1._doc.unit)
        
      }
      for(i = 0; i < unitData.length; i++) {
        var para2 = unitData[i];
       // console.log(para)
       //data.push(para._doc.parameters)
      data1.push(para2._doc.unit)
      
    }
      //console.log(data)
      uniq_param = [...new Set(data)];
      uniq_unit = [...new Set(data1)];
      if(!parameterData){
        return res.status(404).send()
      }else{
        res.status(200).json({"device_type": device_type,"parameters": uniq_param, "unit": uniq_unit})
      }
    }
    }catch(e){
      res.send(e)
    }
   })


   module.exports = router;
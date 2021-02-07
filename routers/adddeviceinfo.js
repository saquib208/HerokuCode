const express = require("express");
const router = new express.Router();
const mongoose = require('mongoose');
const validator = require("validator");
const Device_Info = require("../models/AddDevicesSchema")
const Device_Type = require("../models/DeviceTypesSchema")
const Parameter = require("../models/parametersSchema")

router.post("/addDevice", async (req,res)=>{
    try{

      function leftFillNum(num, targetLength) {
        return num.toString().padStart(targetLength, 0);
    }

      
      const param_body = Object.keys(req.body.parameters)
      const device_name = req.body.device_name
   
        const adddeviceData = await Device_Type.findOne({device_name:device_name})
  
        var result= []
            const param = await Parameter.find({device_name:req.body.device_name},{unit:0,device_name:0,Date:0,_id:0})
            param.forEach(function(u) { result.push(u.parameters) })

        function checkSubset(p1,p2){
          
          if(typeof(p2)=='object'&& p2.every(val => p1.includes(val))){
            return true ;
          }else if(typeof(p2)=='string' && p1.includes(p2)){
            return true

          }
          else{
            return false
          }
        }
        
      
        if(!adddeviceData )
        {
          return res.status(404).json({message:"Device name doesn't exist,Please add device in db, before device registration"})
        }

        else if(!checkSubset(result,param_body))
        {
          return res.status(404).json({message:"Please add parameter in the db before device registration",
                                      hint:"provide exact parameter name in the key value form {'parameter':'default value'}"})
          
        }
      
        
        
        else{
            
            myCount = await Device_Info.find({device_id:{$regex:new RegExp(device_name, "i")}
             }).count()
            const add_device = new Device_Info({
              device_id : req.body.device_name + leftFillNum(myCount ,5),            
              serial_no : new Date().toISOString().substr(0, 7).replace('-', '')+req.body.device_name+leftFillNum(myCount ,3), 

              location : req.body.location,
              parameters: req.body.parameters
            })
            
           
              const device_count = await Device_Info.find({device_id:{$regex:new RegExp(device_name, "i")}
            }).count()
         
            
            add_device.save().then(()=>{
              


            res.status(201).json({

              "device_id":add_device.device_id,
              "serial_number" : add_device.serial_no,
              "location" : add_device.location,
              "parameters" : add_device.parameters
            })
            

            deviceSchema = new mongoose.Schema(
              
            { 
              server_time: {type: Date,default: Date.now} ,
              client_time : {type : Date },
              device_name : { type : String }
              
            },
            {strict:false,versionKey:false}
            )
        
            var Mymodel = mongoose.model(add_device.device_id,deviceSchema,add_device.device_id );
            clientTime ={"client_time":"0"}
            var a =add_device.parameters
            var id = add_device.device_id
            
            var device_name = {"device_name":id}
            var d = Object.assign({}, device_name, a[0],clientTime)
            var dic = {...device_name, ...a[0],...clientTime}
   
            Mymodel.updateOne({}, dic, (error) => {
           
            });

            new Mymodel(d).save(function(err,result){ 
     
            })
            
            Mymodel.createCollection()      
            
          })
          
    }
   

      }catch(e){
        res.send(e)
      }
     })



router.get("/getDeviceInfo/:device_id", async(req,res) => {
    try{   

        const dev_id = req.params.device_id;
        const deviceData = await Device_Info.find({device_id:dev_id},{_id:0})
  
        if(deviceData.length == 0)
        {
          return res.status(404).json({message:"Device doesn't exist"})
        }

        else {
   
        res.status(200).json(deviceData)

        }
    }catch(e){
        res.send(e)
    }
})


module.exports = router;
const express =  require("express");
const bodyParser = require("body-parser")
require("./db/conn");
const Device_Type = require("./models/DeviceTypesSchema");
const  Parameter = require("./models/parametersSchema");
const Device_Info = require("./models/AddDevicesSchema")
const DeviceInfo = require("./routers/deviceinfo");
const ParameterInfo = require("./routers/parameterinfo");
const AddDeviceInfo = require("./routers/adddeviceinfo");
const InsertData = require("./routers/InsertData");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
// app.use((req, res, next ) => {
//   res.header('Access-Control-Allow-Origin','*')
//   res.header('Access-Control-Allow-Headers',
//   'Origin,X-Requested-With, Content-Type, Accept, Authorization');
  
//   if (req.method == 'OPTIONS') {
//       res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET')
//       return res.status(200).json({});    }

// });
// app.use(bodyParser.urlencoded({
//     extended: false
//   }));
app.use(bodyParser.json())

app.use(DeviceInfo);
app.use(ParameterInfo);
app.use(AddDeviceInfo);
app.use(InsertData);
app.listen(port,() => {
    console.log(`connection is setup at ${port}`);  

});
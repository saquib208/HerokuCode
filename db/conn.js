const mongoose = require("mongoose");
require('dotenv').config()

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@devicedb.9k0qp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
//const { url } = require('./config')
//const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@coding-blog-t0xf0.mongodb.net/<dbname>`
//var url = "mongodb://localhost:27017/DeviceRecord"
//const url = 'mongodb+srv://admin:mongodb@devicedb.9k0qp.mongodb.net/DEVICEDB?retryWrites=true&w=majority'
mongoose.connect(url,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    console.log("connection is succesful");
}).catch((e) => {
    console.log("No connection");
})
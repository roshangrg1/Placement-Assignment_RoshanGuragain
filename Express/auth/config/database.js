const mongoose = require('mongoose');

const MONGODB_URL=process.env.MONGODB_URL
mongoose.set('strictQuery',false);

exports.connect = ()=> {
    mongoose.connect(MONGODB_URL ,{
        useNewUrlParser: true,
       
        useUnifiedTopology: true
    })
    .then(console.log("Db connected with a success"))
    .catch((error)=>{
        console.log("db connection failed")
        console.log(error)
        process.exit(1)
    })
}
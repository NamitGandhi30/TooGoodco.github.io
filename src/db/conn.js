const mongoose =require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/signUp ",{
    useNewUrlParser : true,
    useUnifiedTopology:true,
    // useCreateIndex:true,
})
.then(()=>{
    console.log('connected to the database');
}).catch((e)=>{
    console.log('no connection');
})
let mongoose=require("mongoose");

let userSchema=mongoose.Schema({
    email:String,
    pass:String,
    age:String
},{
    versionKey:false
})

let UserModel=mongoose.model("user",userSchema);

module.exports={UserModel}
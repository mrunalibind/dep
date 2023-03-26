let mongoose=require("mongoose");

let noteSchema=mongoose.Schema({
    title:String,
    body:String,
    userId:String
},{
    versionKey:false
})

let NoteModel=mongoose.model("note",noteSchema);

module.exports={NoteModel}
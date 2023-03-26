let express=require("express");
const { NoteModel } = require("../model/note_model");
let noteRoute=express.Router();

noteRoute.get("/read",async(req,res)=>{
    try {
        let notes=await NoteModel.find();
        res.status(200).send(notes);
    } catch (error) {
        res.status(400).send({"msg":error.msg});
    }
})

noteRoute.post("/add",async(req,res)=>{
    try {
        let note=new NoteModel(req.body);
        await note.save();
        res.status(200).send({"msg":"Note has been Added"})
    } catch (error) {
        res.status(400).send({"msg":error.msg})
    }
})

noteRoute.patch("/update/:Id",async(req,res)=>{
    let {Id}=req.params;
    try {
        await NoteModel.findByIdAndUpdate({_id:Id},req.body)
        res.status(200).send({"msg":"Note has been Updated"})
    } catch (error) {
        res.status(400).send({"msg":error.msg});
    }
})

noteRoute.delete("/delete/:Id",async(req,res)=>{
    let {Id}=req.params;
    try {
        await NoteModel.findByIdAndDelete({_id:Id},req.body)
        res.status(200).send({"msg":"Note has been Deleted"})
    } catch (error) {
        res.status(400).send({"msg":error.msg});
    }
})

module.exports={noteRoute}
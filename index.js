let express=require("express");
let app=express();
require("dotenv").config(); 
const { connection } = require("./db");
app.use(express.json())
let cors=require("cors");
app.use(cors())
let {userRoute}=require("./routes/user_route");
app.use("/user",userRoute);
let {auth}=require("./middleware/auth_midd")
app.use(auth)
let {noteRoute}=require("./routes/note_route")
app.use("/note",noteRoute);






app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to mongoDB")
    } catch (error) {
        console.log(error)
    }
    console.log("Server is running on port",process.env.port)
})
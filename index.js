import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import dotenv  from "dotenv"


const app= express();
const PORT =  8000

dotenv.config();
//CONECT DATABASE
app.listen(PORT,()=>{
    console.log("server is running")
})
mongoose.connect("mongodb+srv://odd_job:123@cluster0.krrhbzs.mongodb.net/?retryWrites=true&w=majority",
{ useNewUrlParser:true, useUnifiedTopology:true,
}).then(()=>{
    console.log("Connected")

}).catch(err =>{
    console.log('err',err)
})

app.disable('etag');

app.use(bodyParser.json({limit:"10mb"}));
app.use(bodyParser.urlencoded({extended:true,limit:"10mb"    }));
app.use(cors());
app.use(morgan("common"));
app.use(cookieParser())
app.use(express.json())





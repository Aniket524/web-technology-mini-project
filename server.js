const express = require('express')
const todo = require("./models/ToDoModel")

const mongoose = require('mongoose')

require("dotenv").config();

const cors = require('cors')

const app = express()

const bodyParser = require('body-parser');
const { findOneAndDelete } = require('./models/ToDoModel');
// app.set("views", path.join(__dirname))
app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 5000;
// app.get('/',(req,res)=>{
//     res.render("home");
// })

app.get('/gettodo',async(req,res)=>{
    const todos = await todo.find();
    res.json(todos);
})

app.post("/newuser",async(req,res)=>{
    const text = req.body.text;
    const newuser = await new todo({text:req.body.text,complete:req.body.complete})
    newuser.save();
    res.json(newuser);
})

app.delete("/deleteuser/:id",(req,res)=>{
    const result = todo.findByIdAndDelete({_id:req.params.id},(req,res,err)=>{
        if(!err)
        {
            console.log("item deleted")
        }else{
            console.log(err)
        }
    });
    // const result = await todo.findOneAndDelete({_id: req.params.id})
    res.json(result)
})

app.get("/todo/complete/:id",async(req,res)=>{
    const tododemo= await todo.findById(req.params.id);
    tododemo.complete = !tododemo.complete;
    tododemo.save();
    res.json(tododemo);
})

app.listen(PORT,()=>{console.log(`app is running on port ${PORT}`);})
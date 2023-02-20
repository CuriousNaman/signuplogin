import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

mongoose.set('strictQuery',false);
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json())
mongoose.connect("mongodb://0.0.0.0:27017/UserstudentDB", {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    confirm: String
})

const Users = mongoose.model("Users", userSchema);

app.post('/register', function(req,res){
    const{name, email, password, confirm} = req.body;
    Users.findOne({email: email}, (err, user)=>{
        if(user){
            res.send({message: "User already Registered"})
        }else{
            const user = new Users({
                name, email, password, confirm
            })
            user.save(err =>{
                if(err){
                    console.log(err)
                }else{
                    res.send({message: "Registeration Successful"})
                }
             })
        }
    })
});

app.post("/login", function(req,res){
    const{email, password} = req.body;
    Users.findOne({email: email}, (err, user) =>{
     if(user){
        if(user.password === password){
            res.send({message: "Successfully Login"})
        }else{
            res.send({message: "Password didn't match"})
        }
     }else{
        res.send({message: "User not registered"})
    }
    })
})

app.listen(3500, function(req,res){
    console.log("Server connected")
})


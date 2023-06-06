require('dotenv').config()
require('./config/database').connect()  //importing database.

const express = require('express')
const jwt =require ('jsonwebtoken')
const bcrypt = require('bcryptjs')
var cookieParser = require('cookie-parser')

// custom made middleware
    const auth= require("./middleware/auth")




// import model  -User
const User = require("./model/user")

const app = express()
app.use(express.json)           // Discuss this middle ware later.
app.use(express.urlencoded({ extended: true })) // for form data.
app.use(cookieParser())


app.get("/", (req, res)=>{
    
})

app.post("/register", async (req,res)=>{
    // console.log(req.body)
    try {
        // collect all the information from frontend.
        const {firstname,lastname,email,password}=req.body

        // validate
        if (!(email && password && firstname && lastname)) {
            res.status(400).send("All fields are required.")
        } 

        // Check if email is in correct format - assignment
            
        // Check if user already exist
        const existingUser= await User.findOne({email:email})
        if(existingUser){
            res.status(400).send("All field are required")
        }

        // encrypt the password.
         const myEncPassword= await bcrypt.hash(password, 10)

        //  Create a new entry in database.

        const user= await User.create({
            firstname,
            lastname,
            email,
            password: myEncPassword
        })

        // create a token
        const token =jwt.sign({
            id: user._id , email
        }, "shhhh",{expiresIn:'2h'})

        user.token = token
        // dont want to share the password.

        user.password = undefined

        res.status(201).json(user) // for frontend

    } catch (error) {
        console.log(error)
        console.log("Error is in response route.");
    }
})


app.post("/login" , async (req,res)=>{
    try {
    //    collect all he information from front end
        const {email, password}= req.body
        // validate
        if(!(email && password)){
            console.log("email and password are required.");
        }
        // check user in database
        const user= await User.findOne({email})

        // if user doesnot exist -- asissment

        // match the password 
        if (user && (await bcrypt.compare(password  ,user.password))){
           const token= jwt.sign({id: user._id, email}, 'shhhh',{expiresIn:'2h'})


           user.password = undefined
           user.token = token

           const options={
            expires: new Date (Date.now()+ 3 *24 *60 *60 *1000),
            httpOnly:true
           }

           res.status(201).cookie("token", token, options).json({
            success:true,
            token,
            user
           })
        }

        // create token and send
        res.sendStatus(200).send("email and password is in correct")
    }
     catch (error) {
        console.log(error);
        
    }
})

// verify the cookie and allows the user to log in.

app.get("/dashboard" , auth, (req,  res)=>{
        
    res.send('Welcome to dashboard') 
})

app.get ("/profile", (req, res )=>{

    // access to req.user =id._ , email

    // based on id query to database to ge all the in formation of user - findone({})

    // Send a json response. with all the data
})


module.exports = app
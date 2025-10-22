const express = require('express')
const connectDB =  require('./config/database.js')
const app= express();
const User = require('./models/user.js')
app.post("/signup", async (req, res)=>{
    const user =new User(
       { firstName: "Suraj",
        lastName:"Gupta",
        emailId:"surajgupta@gmail.com",
        password:"@1234"}
       )
       try{       await user.save();
       res.send("User added successfully")}
       catch(err){
        res.status(404).send("error " + err.message);
       }


    })

connectDB()
.then(()=>{
    console.log("Database connected successfully")

app.listen(3000, ()=>{
   console.log("Server is live............ ")
})
})
.catch((err)=>{
    console.error("Database can not be connected");
});

 
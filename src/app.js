const express = require('express')

const app= express();

app.use("/test",(req , res)=>{
    res.send("Hello from the server")
});

app.use("/",(req , res)=>{
    res.send("Hello from the Node")
});


app.listen(3000, ()=>{
   console.log("Server is live............")
})
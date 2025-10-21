const express = require('express')

const app= express();

app.use("/test",(req , res)=>{
    res.send("Hello from the server")
});

app.post("/user",(req , res)=>{
    res.send("Hello from the server Post")
})

app.listen(3000, ()=>{
   console.log("Server is live............ ")
})
 
const express = require('express')
const connectDB = require('./config/database.js')
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt')
const User = require('./models/user.js')
const { validateSignUpData } = require('./utils/validation.js')
app.use(express.json())
app.use(cookieParser()); // middleware to parse cookies

app.post("/signup", async (req, res) => {

    try {
        validateSignUpData(req)
        const { password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);
        const user = new User({
            ...req.body,
            password: passwordHash
        });
        await user.save();
        res.send("User added successfully")
    }
    catch (err) {
        res.status(404).send("error " + err.message);
    }
})
app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid credentials email")
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if (isPassword) {
            //Create jwt token
            //Add toen to cokie and send the response 
            res.cookie('username', 'Suraj Gupta', {
                maxAge: 600000000,         // cookie expires in 1 minute
                httpOnly: true,        // not accessible via JS on client side
                secure: false,         // set true if using HTTPS
            });
            res.send("Login successfully")
        }
        else {
            throw new Error("Invalid credentials password")
        }

    } catch (err) {
        res.status(404).send("error " + err.message);

    }
})

app.get("/profile" ,async (req, res)=>{
    cookies= req.cookies 
    console.log(cookies)
    res.send("reading cokkies")
})
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const users = await User.findOne({ emailId: userEmail });
        if (!users) {
            res.status(404).send("user not found")
        }
        else {
            res.send(users)
        }
    } catch (error) {
        res.status(404).send("Error" + error.message)
    }
})
app.get("/delete", async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId)
        res.send("user deleted successfully");
    } catch (error) {
        res.status(404).send("Error" + error.message)
    }
})
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;

    try {
        // ❌ Block changing emailId, firstName, lastName
        if (data.emailId || data.firstName || data.lastName) {
            return res.status(400).send("You cannot change name or email.");
        }

        // ✅ Allow only existing schema fields
        const allowedFields = ["age", "gender", "photoUrl", "about", "skills"];
        const invalidFields = Object.keys(data).filter(
            key => !allowedFields.includes(key) && key !== "userId"
        );

        if (invalidFields.length > 0) {
            return res.status(400).send("Invalid field(s): " + invalidFields.join(", "));
        }

        await User.findByIdAndUpdate(userId, data, { runValidators: true });
        res.send("User updated successfully");
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});


connectDB()
    .then(() => {
        console.log("Database connected successfully")

        app.listen(3000, () => {
            console.log("Server is live............ ")
        })
    })
    .catch((err) => {
        console.error("Database can not be connected");
    });


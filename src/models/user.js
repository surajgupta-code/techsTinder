const mongoose = require("mongoose");
const validator = require("validator"); // import validator

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function(value) {
                return validator.isEmail(value);
            },
            message: "Invalid email format"
        }
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: String
    },
    gender: {
        type: String
    },
    photoUrl: {
        type: String,
        default: "https://www.flaticon.com/free-icon/user_149071?term=profile+picture&page=1&position=5&origin=tag&related_id=149071"
    },
    about: {
        type: String
    },
    skills: {
        type: String
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;

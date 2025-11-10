const {default: mongoose, Schema} = require("mongoose");

const authSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
    },
    price: {
        type: String,
        require: true,
    },
    password : {
        type: String,
        require: true,
        select:false,
    },
    birthDate : {
        type: Date,
        require: true,
    },
    blogs : [{
        type: Schema.Types.ObjectId,
        ref: "blogs",
        default: []
    }]
},
{timestamps: true})

module.exports = mongoose.model("auth", authSchema)


// 2) მომხმარებლის მოდელი
// თითოეულ მომხმარებელს უნდა ჰქონდეს შემდეგი ველები:
// - fullName
// - email
// - password
// - birthDate
// - blogs (ბლოგების მასივი)
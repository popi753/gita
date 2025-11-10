const {default: mongoose, Schema } = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
    author : {
        type: Schema.Types.ObjectId,
        ref: "auth",
        require: true
    }

},
{timestamps: true})

module.exports = mongoose.model("blogs", blogSchema)


// 3) ბლოგის მოდელი და CRUD ფუნქციონალი
// შექმენით ბლოგებისთვის სრული CRUD ფუნქციონალი — შექმნა, წაკითხვა, განახლება, წაშლა.თითოეულ ბლოგს უნდა ჰქონდეს:
// - title
// - content
// - author
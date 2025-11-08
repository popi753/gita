const {default: mongoose } = require("mongoose");

const expenseSchema = new mongoose.Schema({
    category: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
},
{timestamps: true})

module.exports = mongoose.model("expense", expenseSchema)

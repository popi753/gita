const {validatePrice} = require("../utils")

module.exports = (req,res,next)=>{
    const {price,category} = req.body;
    const error = {};
    if (!price) {
        error.price = "price is required"
    }else if(!validatePrice(price)){
        error.price = "price should be valid integer"
    }
    if (!category) {
        error.category = "category is required"
    }else if (typeof category !== "string") {
        error.category = "category should be valid string"
    }
    if (Object.entries(error).length) {
        res.error = error;
        return res.render("expenses/expenseCreate", {error});
    }

    next();
}
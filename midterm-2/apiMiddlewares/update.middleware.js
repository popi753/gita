const {validatePrice} = require("../utils")

module.exports = (req,res,next)=>{
    const {id,category,price} = req.body;
    const error = {};
     if (!id) {
        error.id = "id is required";
    }

    if (!category && !price) {
        error.body = "enter category and/or price field";
        return res.status(400).json({error});
    }

    if (price && !validatePrice(price)) {
        error.price = "price should be valid integer";
    }

    if (category && typeof category !== "string") {
        error.category = "category should be valid string";
    }

    if (Object.entries(error).length) {
        return res.status(400).json({error});
    }

    next();
}
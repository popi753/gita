module.exports = (req,res,next)=>{
    const {price,category} = req.body;
    if (!price || !category) {
        return res.status(400).json({error: "Price and category are required"});
    }
    if (!validatePrice(price)) {
        return res.status(400).json({error: "Invalid price"})
    }
    next();
}
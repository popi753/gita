const {isValidObjectId} = require("mongoose");


module.exports = (req,res,next)=>{
    const id = req.body?.id;
    if (!isValidObjectId(id)) {
        return res.status(400).json({message: "Wrong id is provided"});
    }

    console.log("blog id is provided");
    next();
}
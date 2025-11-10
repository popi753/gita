module.exports = (req,res,next)=>{
    const {title,content} = req.body;
    const error = {};

    if (!title && !content) {
        error.body = "enter title and/or content field";
        return res.status(400).json({error});
    }

    if (content && typeof content !== "string") {
        error.content = "content should be valid integer";
    }

    if (title && typeof title !== "string") {
        error.title = "title should be valid string";
    }

    if (Object.entries(error).length) {
        return res.status(400).json({error});
    }

    console.log("update body validated")
    next();
}
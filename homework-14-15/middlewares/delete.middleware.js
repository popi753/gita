module.exports = (req,res,next)=>{
    if (!req.headers.secret || req.headers.secret !== "random123") {
        return res.status(403).json({error: "Forbidden"});
    }
    next();
}
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req,res,next)=>{

    try {
        const header = req.headers["authorization"] ;
        if (!header) {
            return res.status(403).json({message: "token not provided"});
        }

        const token = header.split(" ")[1];

        const payload = await jwt.verify(token, process.env.secret);

        req.userId = payload.userId;

        console.log("token validated")
        next();

    } catch (error) {
                res.status(500).json({ error: "Failed to validate token" });
    }
}
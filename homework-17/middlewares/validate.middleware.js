const { registerSchema,loginSchema} = require("../validation/auth.validation.js");
const { blogSchema} = require("../validation/blogs.validation.js");



exports.registerValidation = (req,res,next)=>{
    const {error,value} = registerSchema.validate(req.body || {}, {abortEarly: false})
    if (error) {
        return res.status(400).json({message: error.details.map(element=>element.message)});
    };

    req.body = value;
    console.log("validated for registration")
    next();
};

exports.loginValidation = (req,res,next)=>{
    const {error,value} = loginSchema.validate(req.body || {}, {abortEarly: false})
    if (error) {
        return res.status(400).json({message: error.details.map(element=>element.message)});
    };

    req.body = value;
    console.log("validated for login")
    next();
};

exports.blogValidation = (req,res,next)=>{
    const {error,value} = blogSchema.validate(req.body || {}, {abortEarly: false})
    if (error) {
        return res.status(400).json({message: error.details.map(element=>element.message)});
    };

    req.body = value;
    console.log("validated for blog")
    next();
}

const authModel = require("../auth/auth.model.js");
const blogsModel = require("./blogs.model.js")
// require("dotenv").config();

exports.getBlogById = async (req,res)=>{
    try {
        const {id} = req.body;
        const blog = await blogsModel.findById(id)
        return res.status(200).json({success: true, blog})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch blog" });        
    }
}

exports.getAllBlogs = async (req,res)=>{
    try {
        const blogs = await blogsModel.find({}).populate({ path: "author", select: "fullName" });

        return res.status(200).json({success: true, blogs})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch blogs" });        
    }
}

exports.createBlog = async (req,res)=>{
    try {
        const {title, content} = req.body;

        const newBlog = await blogsModel.create({
            title,
            content,
            author: req.userId
        });

        await authModel.findByIdAndUpdate(req.userId,{
            $push: {blogs: newBlog._id}
        })
        
        res.status(201).json({success: true, newBlog})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create blog" });
    }
}

exports.deleteBlog = async (req,res)=>{
    try {
        const {id} = req.body;
        const userId = req.userId;

        const user = await authModel.findOne({
            _id: userId,
            blogs: { $in: [ id ] }
            })

        if (!user) {
            return res.status(400).json({error: "userId or blogId is incorrect"})
        }
        await blogsModel.findByIdAndDelete(id);

        await authModel.findByIdAndUpdate(userId, { $pull: { blogs: id } });

        res.status(200).json({success: true, message: "blog is deleted"})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete blog" });
    }
}

exports.updateBlog = async(req,res)=>{
    try {
        const {id,title,content} = req.body;
        const userId = req.userId;

        const user = await authModel.findOne({
            _id: userId,
            blogs: { $in: [ id ] }
            })

        if (!user) {
            return res.status(400).json({error: "userId or blogId is incorrect"})
        }
        await blogsModel.findByIdAndUpdate(id,{
            title,
            content
        });


        res.status(200).json({success:true, message:"blog is updated"})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update blog" });
    }
}



const {Router} = require("express");
const blogsRouter = Router();

const {blogValidation} = require("../middlewares/validate.middleware.js");
const checkId = require("../middlewares/checkID.middleware.js");
const isAuth = require("../middlewares/isAuth.middleware.js");
const updateBlogMiddleware = require("../middlewares/update.middleware.js");

const blogsService = require("./blogs.service.js");

blogsRouter.get("/getbyid",        checkId,                                            blogsService.getBlogById);
blogsRouter.get("/",                                                                   blogsService.getAllBlogs);
blogsRouter.post("/",   isAuth,    blogValidation,                                     blogsService.createBlog);
blogsRouter.delete("/", isAuth,    checkId,                                            blogsService.deleteBlog);
blogsRouter.put("/",    isAuth,    checkId,           updateBlogMiddleware,            blogsService.updateBlog);



module.exports = blogsRouter;
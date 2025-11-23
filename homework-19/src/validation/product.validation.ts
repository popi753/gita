import Joi from "joi";

const productSchema = Joi.object({
    title : Joi.string().min(3).max(20).required(),
    description: Joi.string().max(100).required(),
    imageUrl: Joi.string().min(3).max(20).required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().min(3).max(20).required(),
});

export default productSchema;
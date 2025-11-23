import { Router } from "express";
import productMiddleware from "../middlewares/product.middleware";
import checkRoleMiddleware from "../middlewares/checkRole.middleware";
import checkProductMiddleware from "../middlewares/checkProduct.middleware";
import { getProducts, createProduct, updateProduct,deleteProduct,getProductById } from "./products.service";

const productRouter = Router();

productRouter.get("/",                                                                             getProducts);

productRouter.get("/:id",                                                                          getProductById);

productRouter.post("/",                                                       productMiddleware,   createProduct);

productRouter.put("/:id",    checkRoleMiddleware,   checkProductMiddleware,   productMiddleware,   updateProduct);

productRouter.delete("/:id", checkRoleMiddleware,   checkProductMiddleware,                        deleteProduct);

export default productRouter
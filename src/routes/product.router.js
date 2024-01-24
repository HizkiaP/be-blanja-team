import express from "express";
const router = express.Router();
import productController from "../controllers/product.controller.js";
import upload from "../middlewares/upload.js";

router.post("/", upload, productController.createProduct);
router.get("/", productController.search);
router.put("/:id", upload, productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
router.get("/:id", productController.getByID);
router.get("/seller/:seller_id", productController.getBySellerID);
router.get("/category/:category_id", productController.getByCategoryID);

export default router;

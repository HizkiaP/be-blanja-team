import productModel from "../models/product.model.js";
import cloudinary from "../helpers/cloudinary.js";
import createError from "http-errors";

const productController = {
  createProduct: async (req, res, next) => {
    try {
      const {
        name,
        price,
        color,
        size,
        stock,
        rating,
        condition,
        description,
        seller_id,
        category_id,
        created_at,
      } = req.body;
      let imageUrl = "";
      if (req.file) {
        const uploadToCloudinary = await cloudinary.uploader.upload(
          req?.file?.path,
          {
            folder: "blanja/product",
          }
        );

        if (!uploadToCloudinary) {
          return next(createError(res, 400, "upload image failed"));
        }
        imageUrl = uploadToCloudinary?.secure_url ?? "";
      }

      const currentUTCDateTime = new Date().toUTCString();

      const data = {
        name: name,
        image: imageUrl,
        price: price,
        color: color,
        size: size,
        stock: stock,
        rating: rating,
        condition: condition,
        description: description,
        seller_id: seller_id ?? null,
        category_id: category_id ?? null,
        created_at: currentUTCDateTime,
      };
      console.log(data);
      const result = await productModel.insertProduct(data);
      if (result?.rowCount > 0) {
        return res.status(201).json({
          success: true,
          data,
          message: "Create product success",
        });
      }
    } catch (error) {
      return next(createError(500, "Error creating product"));
    }
  },

  updateProduct: async (req, res, next) => {
    try {
      const id = req.params.id;
      const {
        name,
        price,
        color,
        size,
        stock,
        rating,
        condition,
        description,
        seller_id,
        category_id,
      } = req.body;

      const { rowCount, rows } = await productModel.selectByID(id);
      if (!rowCount) {
        return next(createError(res, 404, "Product id is not found"));
      }

      let imageUrl = "";
      if (req.file) {
        const uploadToCloudinary = await cloudinary.uploader.upload(
          req.file.path,
          {
            folder: "blanja/product",
          }
        );

        if (!uploadToCloudinary) {
          return next(createError(res, 400, "Upload image failed"));
        }
        imageUrl = uploadToCloudinary.secure_url ?? "";
      }

      const data = {
        id: id,
        name: name ?? rows[0]?.name,
        image: imageUrl ?? rows[0]?.image,
        price: price ?? rows[0]?.price,
        color: color ?? rows[0]?.color,
        size: size ?? rows[0]?.size,
        stock: stock ?? rows[0]?.stock,
        rating: rating ?? rows[0]?.rating,
        condition: condition ?? rows[0]?.condition,
        description: description ?? rows[0]?.description,
        seller_id: seller_id ?? rows[0]?.seller_id,
        category_id: category_id ?? rows[0]?.category_id,
      };

      const result = await productModel.updateProducts(data);
      if (result?.rowCount > 0) {
        return res.status(200).json({
          success: true,
          data,
          message: "Update product success",
        });
      } else {
        return next(createError(res, 404, "Product not found for updating"));
      }
    } catch (error) {
      console.error(error.message);
      return next(createError(500, "Error updating product"));
    }
  },

  getAllProducts: async (req, res, next) => {
    try {
      const result = await productModel.selectAllProducts();
      const products = result.rows;
      res.status(200).json({
        success: true,
        data: products,
        message: "Products retrieved successfully",
      });
    } catch (err) {
      console.log(err.message);
    }
  },
};

export default productController;

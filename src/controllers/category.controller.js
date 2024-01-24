import categoryModel from "../models/category.model.js";
import cloudinary from "../helpers/cloudinary.js";
import createError from "http-errors";

const categoryController = {
  createProduct: async (req, res, next) => {
    try {
      const { name } = req.body;
      let imageUrl = "";
      if (req.file) {
        const uploadToCloudinary = await cloudinary.uploader.upload(
          req?.file?.path,
          {
            folder: "blanja/category",
          }
        );

        if (!uploadToCloudinary) {
          return next(createError(res, 400, "upload image failed"));
        }
        imageUrl = uploadToCloudinary?.secure_url ?? "";
      }

      const data = {
        name: name,
        image: imageUrl,
      };
      console.log(data);
      const result = await categoryModel.insertCategory(data);
      if (result?.rowCount > 0) {
        return res.status(201).json({
          success: true,
          data,
          message: "Create category success",
        });
      }
    } catch (error) {
      return next(createError(500, "Error creating category"));
    }
  },

  getAllCategories: async (req, res, next) => {
    try {
      const result = await categoryModel.selectAllProducts();
      const categories = result.rows;

      res.status(200).json({
        success: true,
        data: categories,
        message: "Categories retrieved successfully",
      });
    } catch (err) {
      console.error(err.message);
      next(createError(500, "Error getting all categories"));
    }
  },
};
export default categoryController;

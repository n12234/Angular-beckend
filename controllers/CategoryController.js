const Category = require("../models/CategoryModel");
const Product = require("../models/ProductModel");
const categoryValidator = require("../validations/category");


class CategoryController {

  async getListCategory(req, res) {
    try {
      const category = await Category.find();
      res.json(category);
    } catch (error) {
      res.status(400).json({
        error: "Không tìm thấy danh mục",
      });
    }
  }

  async getAllCategory(req, res) {
    try {
      const category = await Product.distinct('category');
      res.json(category);
    } catch (error) {
      res.status(400).json({
        error: "Không tìm thấy danh mục",
      });
    }
  }

  async getDetailCategory(req, res) {
    try {
      const categories = await Category.findOne({ _id: req.params.id });
      res.json(categories);
    } catch (error) {
      res.status(400).json({
        error: "Không tìm thấy danh mục nào",
      });
    }
  }

  async createCategory(req, res) {
    try {
      const {error} = categoryValidator.validate(req.body, {
        abortEarly: false,
      })

      if(error){
        const errors = error.details.map((err) => err.message)
        return res.status(400).json({message: errors})
      }

      const categories = new Category(req.body)
      const categorySave = await categories.save();
      res.json({message: 'Add thanh cong', data: categorySave})
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  }

  async updateCategory(req, res) {
    try {
      const categories = await Category.updateOne({ _id: req.params.id }, req.body);
      res.status(200).json({message: 'update thanh cong'});
    } catch (error) {
      res.status(400).json({
        error: "update faill!!",
      });
    }
  }

  async deleteCategory(req, res) {
    try {
      const categories = await Category.deleteOne({ _id: req.params.id });
      res.status(200).json({message: 'Xoa thanh cong'});
    } catch (error) {
      res.status(400).json({
        error: "Delete faill!!",
      });
    }
  }

}


module.exports = new CategoryController();
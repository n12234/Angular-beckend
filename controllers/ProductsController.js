const Product = require("../models/ProductModel");
const productValidator = require("../validations/product");

class ProductController {
  async getAllProduct(req, res) {
    // const page = parseInt(req.query.page) || 1;
    // const pageSize = parseInt(req.query.pageSize) || 3;
    const { category } = req.query;
    try {
      const query = category ? { category: { $in: category.split(',') } } : {};
    const products = await Product.find(query)
      // .skip((page - 1) * pageSize)
      // .limit(pageSize);
      res.json(products);
    } catch (error) {
      res.status(400).json({
        error: "Khong tim thay laptop nao",
      });
    }
  }

  async searchProduct(req, res) {
    const { keyword } = req.query;

    try {
      const regex = new RegExp(keyword, "i");
      const products = await Product.find({
        $or: [
          { title: regex },
          { description: regex },
        ],
      });

      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Không tồn tại từ khoá này" });
    }
  }

  async getDetailProduct(req, res) {
    try {
      const products = await Product.findOne({ _id: req.params.id });

      res.json(products);
    } catch (error) {
      res.status(400).json({
        error: "Khong tim thay sản phẩm nao",
      });
    }
  }

  async createProduct(req, res) {
    try {
      // const {error} = productValidator.validate(req.body, {
      //   abortEarly: false,
      // })

      // if(error){
      //   const errors = error.details.map((err) => err.message)
      //   return res.status(400).json({message: errors})
      // }

      const products = new Product(req.body);
      const productSave = await products.save();
      res.json({ message: "Add thanh cong", data: productSave });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  }

  async updateProduct(req, res) {
    try {
      const products = await Product.updateOne(
        { _id: req.params.id },
        req.body
      );
      res.status(200).json({ message: "update thanh cong" });
    } catch (error) {
      res.status(400).json({
        error: "update faill!!",
      });
    }
  }

  async deleteProduct(req, res) {
    try {
      const products = await Product.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: "Xoa thanh cong" });
    } catch (error) {
      res.status(400).json({
        error: "Delete faill!!",
      });
    }
  }
}

module.exports = new ProductController();

const User = require('../models/UserModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const { SECRET_CODE } = process.env;

class UsersController {
  // [GET] /users
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getDetailUser(req, res) {
    try {
      const users = await User.findOne({ _id: req.params.id });
      res.json(users);
    } catch (error) {
      res.status(400).json({
        error: "Khong tim thay ten nguoi dung nao",
      });
    }
  }

  // [PUT] /users/:id
  async updateUser(req, res) {
    try {
      const user = await User.updateOne({ _id: req.params.id }, req.body);
      res
        .status(200)
        .json({ message: 'Update User Successful' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new UsersController();
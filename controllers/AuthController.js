const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const bcryptjs = require("bcryptjs");
const { registerValidator, loginValidator } = require("../validations/user");

dotenv.config();

const { SECRET_CODE } = process.env;

class AuthController {
  async registerUser(req, res) {
    try {
      const { name, email, password } = req.body;

      const { error } = registerValidator.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({ message: errors });
      }

      const userExits = await User.findOne({ email });
      if (userExits) {
        return res.status(400).json({
          message: "Email nay da duoc dang ki roi",
        });
      }

      const hashPassword = await bcryptjs.hash(password, 10);
      await User.create({
        name,
        email,
        password: hashPassword,
      });
      res.status(200).json({ message: "Add User Successful" });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  }

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      const { error } = loginValidator.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({ message: errors });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "Email nay chua dang ki ban co muon dang ki khong",
        });
      }

      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "Email or password khong dung vui long kiem tra lai",
        });
      }

      const token = jwt.sign({id: user._id}, SECRET_CODE, {
        expiresIn: '1d'
      })
      await res.json({
        message: 'Login thanh cong',
        token,
        user: {
            email: user.email
        }
      })
      
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  }
}

module.exports = new AuthController();


const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

dotenv.config();

const { SECRET_CODE } = process.env;

const CheckToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if(!token){
            return res.status(403).json({
                message: 'Ban chua dang nhap'
            })
        }

        const decoded = jwt.verify(token, SECRET_CODE);
        console.log(decoded);

        const user = await User.findById(decoded.id)
        if(!user){
            return res.status(404).json({
                message: 'User khong ton tai trong he thong'
            })
        }
        next();
    } catch (error) {
        return res.status(400).json({
            name: error.name,
            message: error.message
        })
    }
}

module.exports = {CheckToken};
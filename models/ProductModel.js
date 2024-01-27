
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const Product = new Schema(
    {
        title: {type: String},
        price: {type: Number},
        description: {type: String},
        category: {type: [String]},
        image: {type: String},
        // count: {type: String}
    },
    {timestamps: true}
)

module.exports = mongoose.model('Product', Product)
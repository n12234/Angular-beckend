
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const Category = new Schema(
    {
        title: {type: String},
        description: {type: String},
    },
    {timestamps: true}
)

module.exports = mongoose.model('Category', Category)
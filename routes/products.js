const express = require('express')
const router = express.Router();

const ProductController = require('../controllers/ProductsController')

const {CheckToken} = require('../middlewares/CheckToken')

router.get('/', ProductController.getAllProduct)
router.get('/search', ProductController.searchProduct)
router.get('/:id', ProductController.getDetailProduct)
router.post('/', ProductController.createProduct)
router.put('/:id', ProductController.updateProduct)
router.delete('/:id', ProductController.deleteProduct)

module.exports = router;
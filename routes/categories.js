const express = require('express')
const router = express.Router();

const CategoryController = require('../controllers/CategoryController')

router.get('/list', CategoryController.getListCategory)
router.get('/', CategoryController.getAllCategory)
router.get('/:id', CategoryController.getDetailCategory)
router.post('/', CategoryController.createCategory)
router.put('/:id', CategoryController.updateCategory)
router.delete('/:id', CategoryController.deleteCategory)

module.exports = router;
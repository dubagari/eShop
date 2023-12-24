const express = require('express')

const shopController = require('../controller/shop')

const routes = express.Router()

routes.get('/', shopController.getIndex)

routes.get('/product-list', shopController.getproductlis)

routes.get('/product-details/:productId', shopController.getProductDtails)

routes.get('/cart', shopController.getCart)

routes.post('/cart', shopController.postCart)

routes.post('/cart-delete-items', shopController.postCartDelete)


module.exports = routes
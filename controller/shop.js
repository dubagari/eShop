
const Product = require('../model/product')
const Cart = require('../model/cart')

exports.getIndex = (req, res, next) => {
    Product.fatchAll(product => {
        res.render('shop/index', {
            prods: product,
            pageTitle: 'shop',
            path: '/'
        })
    })
}

exports.getProductDtails = (req, res, next) => {
    const prodId = req.params.productId
    Product.findById(prodId, product => {
        res.render('shop/product-details', {
            product: product,
            pageTitle: product.title,
            path: '/product-list'
        })
    })
}
exports.getproductlis = (req, res, next) => {
    Product.fatchAll(product => {
        res.render('shop/product-list', {
            prods: product,
            pageTitle: 'shop',
            path: '/product-list'
        })
    })

}
exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fatchAll(products => {
            const cartProduct = []
            for (const product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id)

                if (cartProductData) {
                    cartProduct.push({ productData: product, qty: cartProductData.qty })
                }

            }
            res.render('shop/cart', {
                pageTitle: 'cart',
                path: '/cart',
                product: cartProduct
            })

        })
    })

}


exports.postCart = (req, res, next) => {
    const prodId = req.body.productId
    Product.findById(prodId, product => {
        Cart.addTocart(prodId, product.price)
    })
    res.redirect('/cart')
}

exports.postCartDelete = (req, res, next) => {
    const prod = req.body.productId
    Product.findById(prod, product => {
        Cart.deleteCartItem(prod, product.price)
        res.redirect('/cart')

    })
}
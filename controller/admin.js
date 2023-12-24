

const Product = require('../model/product')

exports.getAddproduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: "add-products",
        path: "/admin/add-product",
        editing: false
    })
}

exports.postProduct = (req, res, next) => {

    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description
    const product = new Product(null, title, imageUrl, price, description)
    product.save()
    res.redirect('/')
}

exports.geteditproduct = (req, res, next) => {
    const editingMode = req.query.edit
    console.log(editingMode);
    if (!editingMode) {
        return res.redirect('/')
    }

    const prodId = req.params.productId

    console.log(prodId);

    Product.findById(prodId, product => {

        if (!product) {
            return res.redirect('/')
        }

        res.render('admin/edit-product', {
            pageTitle: "Edit products",
            path: "/admin/edit-product",
            editing: editingMode,
            product: product
        })
    })

}


exports.postEditproduct = (req, res, next) => {
    const prodId = req.body.productId
    console.log(prodId);
    const updatedTitle = req.body.title
    const updatedImageUrl = req.body.imageUrl
    const UpdatedPrice = req.body.price
    const updatedDescription = req.body.description

    const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, UpdatedPrice, updatedDescription)
    updatedProduct.save()
    res.redirect('/admin/product')
}

exports.getProduct = (req, res, next) => {

    Product.fatchAll(product => {
        res.render('admin/product', {
            prods: product,
            pageTitle: 'admin product',
            path: '/admin/product'
        })

    })
}


exports.postDelete = (req, res, next) => {
    const prodId = req.body.productId
    Product.deleteById(prodId)
    res.redirect('/admin/product')
}
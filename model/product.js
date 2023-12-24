
const fs = require('fs')
const path = require('path')
const rootPath = require('../util/path')

const Cart = require('./cart')

const p = path.join(rootPath, 'data', 'products.json')

const getAllFile = (cb) => {

    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([])
        } else {
            cb(JSON.parse(fileContent))
        }
    })
}


module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id
        this.title = title
        this.imageUrl = imageUrl
        this.price = price
        this.description = description
    }

    save() {
        getAllFile(products => {
            if (this.id) {
                const updatedProductIndex = products.findIndex(prod => prod.id === this.id)
                const updatedProduct = [...products]
                updatedProduct[updatedProductIndex] = this
                fs.writeFile(p, JSON.stringify(updatedProduct), err => {
                    console.log(err);
                })
            } else {
                this.id = Math.random().toString()
                products.push(this)
                fs.writeFile(p, JSON.stringify(products), err => {
                    console.log(err);
                })
            }

        })

    }

    static deleteById(id) {
        getAllFile(products => {
            const product = products.find(prod => prod.id === id)
            const updated = products.filter(prod => prod.id !== id)
            fs.writeFile(p, JSON.stringify(updated), err => {
                if (!err) {
                    Cart.deleteCartItem(id, product.price)
                }
            })
        })
    }

    static fatchAll(cb) {
        getAllFile(cb)
    }

    static findById(id, cb) {
        getAllFile(products => {
            const product = products.find(p => p.id === id)
            cb(product)
        })
    }

}
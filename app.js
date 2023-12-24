const express = require('express')

const bodyParser = require('body-parser')

const path = require('path')

const rooRouter = require('./util/path')

const shopRoute = require('./routes/shop')
const adminRoutes = require('./routes/admin')
const error404 = require('./controller/error')


const app = express()

app.use(express.static(path.join(rooRouter, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use('/admin', adminRoutes)
app.use(shopRoute)
app.use(error404.error404)

app.listen(3000)
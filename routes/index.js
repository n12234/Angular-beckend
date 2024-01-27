const products = require('./products')
const auth = require('./auth')
const users = require('./users')
const category = require('./categories')

function routes(app) {
    app.use('/products', products)
    app.use('/auth', auth)
    app.use('/categories', category)
    app.use('/users', users)
}

module.exports = routes;
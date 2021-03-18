'use strict'

import Cart from './cart'
import ProductList from './productList'

const cart = new Cart()

const productCatalog = new ProductList(cart)
console.log(productCatalog)


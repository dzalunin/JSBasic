'use strict'

import Vue from 'vue';
import App from './App.vue';
import store from './store/index.js';

new Vue({
    el: 'main',
    template: '<App />',
    components: {
        App,
    },
    store,
})
// import Cart from './cart'
// import ProductList from './productList'

// const cart = new Cart()

// const productCatalog = new ProductList(cart)
// console.log(productCatalog)


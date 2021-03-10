'use strict'

import AbstractList from './abstractList'
import Product from './product'

export default class ProductList extends AbstractList {

    constructor(CartInstance) {
        super()

        this._CartInstance = CartInstance
        this._checkoutPage(1)
    }

    _checkoutPage(page) {
        if (page <= this._totalPages && page > 0) {

            this._fetchData(page)
                .then(this._parseData.bind(this))
                .then(this.render.bind(this))
                .catch(error => {
                    console.log(error)
                })
        }
        else {
            console.log(`Cant go to page ${page}: total pages ${this._totalPages}.`)
        }

    }

    _parseData(data) {

        this._totalPages = data.totalPages
        this._page = data.page

        data._embedded.forEach(element => this._items[element.id] = new Product(this, element))
    }

    _json(response) {
        return response.json()
    }

    _fetchData(page) {

        const querySettings = {
            method: 'GET',
            headers: {
                'Accept': 'application/json;charset=utf-8'
            }
        }

        return fetch(`${this._dataHost}/api/products/page${page}.json`, querySettings)
            .then(this._json)
    }

    addItemToCart(ProductInstance) {
        this._CartInstance.addItem(ProductInstance)
    }

    render() {

        const controlPanel = document.querySelector('.product-list-btns')

        if (document.getElementById('showmore') == null) {

            const btnShowMore = document.createElement('button')
            btnShowMore.id = 'showmore'
            btnShowMore.innerText = 'Показать еще'
            controlPanel.appendChild(btnShowMore)

            btnShowMore.addEventListener('click', () => {
                this._checkoutPage(this._page + 1)
            })
        }

        const placeToRender = document.querySelector('.product-list')

        placeToRender.innerHTML = ''
        for (let [k, v] of Object.entries(this._items)) {
            v.render(placeToRender)
        }
    }

}
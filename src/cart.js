'use strict'

import AbstractList from './abstractList'
import CartItem from './cartItem'

export default class Cart extends AbstractList {

    constructor() {
        super()

        this._initTotals()
    }

    addItem(ProductInstance) {

        const productId = ProductInstance.id()

        let Item = this._items[productId]
        if (Item == null) {
            Item = new CartItem(this,
                productId,
                ProductInstance.name(),
                ProductInstance.price())

            this._items[productId] = Item
        }
        else {
            Item._quantity += 1
            Item._onChange()
        }

        this.calcTotals()

        this.render()
    }

    removeItem(productInstance) {
    }

    _initTotals() {
        this._lineCount = 0
        this._quantity = 0
        this._amount = 0
    }

    calcTotals() {
        this._initTotals()

        for (let [k, v] of Object.entries(this._items)) {
            this._lineCount += 1
            this._amount += v._amount
            this._quantity += v._quantity
        }
    }

    totals() {

        return {
            lineCount: this._lineCount,
            quantity: this._quantity,
            amount: this._amount
        }
    }

    _fetchData() {
    }

    save() {

    }

    render() {

        const placeToRender = document.querySelector('.cart-list')
        placeToRender.innerHTML = ''

        if (this._items) {
            const title = document.createElement('h4')
            title.innerHTML = 'Ваша корзина'
            placeToRender.appendChild(title)

            for (let [k, v] of Object.entries(this._items)) {
                v.render(placeToRender)
            }

            const totals = document.createElement('h4')
            totals.innerHTML =
                `Всего позиций ${this.totals().lineCount} на сумму ${this.totals().amount}`
            placeToRender.appendChild(totals)
        }
    }
}
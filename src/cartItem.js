'use strict'

export default class CartItem {

    constructor(CartInstance, productId, productName, price) {
        this._CartInstance = CartInstance
        this._productId = productId
        this._productName = productName
        this._quantity = 1
        this._price = price
        this._amount = 0

        this._onChange()
    }

    _onChange() {
        this._amount = this._quantity * this._price
        this._CartInstance.calcTotals()
    }

    render(placeToRender) {
        const cell = document.createElement('div')
        cell.setAttribute('class', 'cart-item')
        cell.innerHTML = `${this._productName} : ${this._price} x ${this._quantity}`
        placeToRender.appendChild(cell)
    }
}

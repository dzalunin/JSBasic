'use strict'

export default class Product {
    constructor(ProductListInstance, { id, name, price, img }) {
        this._ProductListInstance = ProductListInstance
        this._id = id
        this._name = name
        this._price = price
        this._img = img
    }

    id() {
        return this._id
    }

    price() {
        return this._price
    }

    name() {
        return this._name
    }

    render(placeToRender) {

        const cell = document.createElement('div')
        cell.setAttribute('class', 'product-item')
        placeToRender.appendChild(cell)

        const img = document.createElement('img')
        img.setAttribute("src", this._img);
        img.setAttribute('class', 'product-img-top')
        cell.appendChild(img)

        const title = document.createElement('p')
        title.setAttribute('class', 'product-title')
        title.innerHTML = this._name
        cell.appendChild(title)

        const price = document.createElement('p')
        price.setAttribute('class', 'product-text')
        price.innerHTML = `Цена: ${this._price}`
        cell.appendChild(price)

        const btnAddToCart = document.createElement('button')
        btnAddToCart.setAttribute('class', 'btn-primary')
        btnAddToCart.innerHTML = 'Добавить в корзину'
        cell.appendChild(btnAddToCart)

        btnAddToCart.addEventListener('click', () => {
            this._ProductListInstance.addItemToCart(this)
        })

    }

}

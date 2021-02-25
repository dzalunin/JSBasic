


class AbstractList {
    _items = {}

    clear() {
        this._items = {}
    }

    fetch() {

    }

    render() {

    }

}


class Product {
    _id = 0
    _name = ''
    _price = 0
    _img = ''

    constructor({ id, name, price, img }) {
        this._id = id
        this._name = name
        this._price = price
        this._img = img
    }

}


class CartItem {
    _CartInstance = null
    _lineId = 0
    _ProductInstance = null
    _price = 0
    _quantity = 0
    _amount = 0

    constructor(CartInstance, { lineId, productId, price, quantity, amount }) {
        this._CartInstance = CartInstance
        this._lineId = lineId
        this._productId = productId
        this._price = price
        this._quantity = quantity
        this._amount = amount
    }

}


class ProductList extends AbstractList {

    constructor() {
        super()
        this.fetchData()
            .then(this.render.bind(this))
    }

    fetchData() {
        this.clear()

        const querySettings = {
            method: 'GET',
            headers: {
                'Accept': 'application/json;charset=utf-8'
            }
        }

        return fetch('http://localhost:40000/api/products/page1.json', querySettings)
            .then(httpResponse => httpResponse.json())
            .then(data => {
                data.forEach(element => this._items[element.id] = new Product(element))
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {

        const placeToRender = document.querySelector('.product-list')

        let cell = ''

        for (let [k, v] of Object.entries(this._items)) {
            // console.log(v)
            cell +=
                `<div class="product-item">
                <img class="product-img-top" src="${v._img}" alt="">
                <div class="product-block">
                <h4 class="product-title">${v._name}</h4>
                <p class="product-text">Цена: ${v._price}</p>
                <a href="#" data-id="${k}" data-price="${v._price}" class="add_to_cart btn btn-primary">Добавить в корзину</a>
                </div>
                </div>`
        }

        const row = document.createElement('div')
        row.innerHTML = cell
        placeToRender.appendChild(row)

    }

}


class Cart extends AbstractList {

    _totals = {
        lineCount: 0,
        quantity: 0,
        amount: 0
    }

    constructor() {
        super()
        this.fetch()
    }


    addItem() {

    }


    removeItem() {

    }


    totals() {
        return this._totals
    }


    fetch() {
        return []
    }


    save() {

    }


    _data() {
        // Получение данных.
        return [
            { lineId: 1, productId: 1, price: 1000, quantity: 2, amount: 2000 },
            { lineId: 2, productId: 2, price: 1050, quantity: 1, amount: 1050 }
        ]

    }

}


let page = new ProductList()
console.log(page)
// page.render(placeToRender)

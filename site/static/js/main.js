


class AbstractList {
    _items = {}
    _page = 0
    _totalPages = 1

    clear() {
        this._items = {}
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
    _productId = 0
    _productName = ''
    _price = 0
    _quantity = 0
    _amount = 0

    constructor(CartInstance, { lineId, productId, price, quantity }) {
        this._CartInstance = CartInstance
        this._lineId = lineId
        this._productId = productId
        this._price = price
        this._quantity = quantity

        this._onChange()
    }

    _onChange() {
        this._amount = this._quantity * this._price
        this._CartInstance.calcTotals()
    }



}


class ProductList extends AbstractList {

    constructor() {
        super()

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
        // console.log(data)
        this._totalPages = data.totalPages
        this._page = data.page

        data._embedded.forEach(element => this._items[element.id] = new Product(element))
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

        return fetch(`http://localhost:40000/api/products/page${page}.json`, querySettings)
            .then(this._json)
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

    constructor() {
        super()

        this._initTotals()
        this.checkoutPage(0)
    }


    addItem(productInstance) {

    }


    removeItem(productInstance) {

    }

    _initTotals() {
        _lineCount = 0
        _quantity = 0
        _amount = 0
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
        return [
            { lineId: 1, productId: 1, price: 1000, quantity: 2, amount: 2000 },
            { lineId: 2, productId: 2, price: 1050, quantity: 1, amount: 1050 }
        ]
    }


    save() {

    }
}


let page = new ProductList()
console.log(page)
// page.render(placeToRender)

class AbstractList {
    _items = {}
    _page = 0
    _totalPages = 1
    _dataHost = 'http://localhost:40000'

    clear() {
        this._items = {}
    }

    render() {

    }

}


class Product {
    _ProductListInstance = null
    _id = 0
    _name = ''
    _price = 0
    _img = ''

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


class CartItem {
    _CartInstance = null
    _productId = 0
    _productName = ''
    _price = 0
    _quantity = 1
    _amount = 0

    constructor(CartInstance, productId, productName, price) {
        this._CartInstance = CartInstance
        this._productId = productId
        this._productName = productName
        this._price = price

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


class ProductList extends AbstractList {

    _CartInstance = null

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


class Cart extends AbstractList {

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

const cart = new Cart()

const productCatalog = new ProductList(cart)
console.log(productCatalog)
// page.render(placeToRender)

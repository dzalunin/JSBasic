"Use strict"

const fs = require('fs')
const express = require('express');
const bodyParser = require('body-parser');


const server = express()
server.use(express.static('./site'))
server.use(express.static('./site/static'))
server.use(bodyParser.json())

server.get('/api/products', (req, res) => {
    const page = req.query.page || 1;

    fs.readFile(`./api/products/page${page}.json`, 'utf8', (err, data) => {
        res.send(data);
    });
});

server.delete('/api/cart', (req, res) => {
    const db = `./api/cart/cart.json`

    fs.writeFile(db, JSON.stringify({}), (err) => {
        res.send("Ok");
    })
})

server.get('/api/cart', (req, res) => {
    const db = `./api/cart/cart.json`

    fs.readFile(db, 'utf8', (err, data) => {
        res.send(data || {});
    });
})

server.post('/api/cart/item', (req, res) => {
    const db = `./api/cart/cart.json`
    // console.log(req.body)

    fs.readFile(db, 'utf8', (err, data) => {
        // if (err) throw err
        const cart = JSON.parse(data || {});
        const product = req.body;

        let item = cart[product.id]
        if (item == null) {
            item = {
                productId: product.id,
                productName: product.name,
                quantity: 1,
                price: product.price,
                amount: product.price
            }
            cart[product.id] = item
        }
        else {
            item.quantity += 1
            item.amount = item.quantity * item.price
        }

        fs.writeFile(db, JSON.stringify(cart), (err) => {
            res.send(cart);
        })
    });
});


server.listen(40000, () => {
    console.log('Server started');
});
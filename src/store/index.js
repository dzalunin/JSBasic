import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);

const productsStore = {
    namespaced: true,
    state: () => ({
        data: {},
        itemsOnPage: [],
        page: 0,
        totalPages: 1,
    }),
    mutations: {
        setData(state, payload) {
            state.page = payload.page
            state.totalPages = payload.totalPages
            payload._embedded.forEach((element) => {
                state.data[element.id] = element
                state.itemsOnPage.push(element.id)
            })
        }
    },
    actions: {
        getPage({ commit, state }, page) {
            const querySettings = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json;charset=utf-8'
                }
            }

            fetch(`/api/products/page${page}.json`, querySettings)
                // fetch(`http://localhost:40000/api/products/page${page}.json`, querySettings)
                .then(response => {
                    return response.json()
                })
                .then(body => {
                    commit('setData', body)
                })
        }
    },

    getters: {
        data: state => state.data,
        itemsOnPage: state => state.itemsOnPage,
    }
}

const cartStore = {
    namespaced: true,
    state: () => ({
        data: {},
        list: [],
    }),
    mutations: {
        addToCart(state, payload) {
            const productId = payload.id

            let item = state.data[productId]
            if (item == null) {
                item = {
                    productId: productId,
                    productName: payload.name,
                    quantity: 1,
                    price: payload.price,
                    amount: payload.price
                }
                state.data[productId] = item
                state.list.push(productId)
            }
            else {
                item.quantity += 1
                item.amount = item.quantity * item.price

                // Для обновления элемента корзины реактивно требуется поменять ссылку 
                // в памяти.
                state.data = { ...state.data }
            }
            console.log(item)
        }
    },
    getters: {
        data: state => state.data,
        list: state => state.list,
    }
}


export default new Vuex.Store({
    modules: {
        products: productsStore,
        cart: cartStore
    }
})
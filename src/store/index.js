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

            fetch(`/api/products`, querySettings)
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
        setData(state, payload) {
            state.list = []
            state.data = payload
            for (let v of Object.values(payload)) {
                state.list.push(v.productId)
            }
        }
    },
    actions: {
        getCart({ commit, state }) {
            const querySettings = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json;charset=utf-8'
                }
            }
            fetch(`/api/cart`, querySettings)
                .then(response => {
                    return response.json()
                })
                .then(body => {
                    commit('setData', body)
                })
        },

        addToCart({ commit, state }, data) {
            const querySettings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            }
            fetch('/api/cart/item', querySettings)
                .then(response => {
                    return response.json()
                })
                .then(body => {
                    commit('setData', body)
                })
                .catch(e => {
                    console.log(e)
                })
        },
        initCart({ commit, state }) {
            const querySettings = {
                method: 'DELETE',
            }
            fetch('/api/cart', querySettings)
                .then(() => {
                    commit('setData', {})
                })
                .catch(e => {
                    console.log(e)
                })
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
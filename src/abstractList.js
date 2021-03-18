'use strict'

export default class AbstractList {

    constructor() {
        this._items = {}
        this._page = 0
        this._totalPages = 1
        this._dataHost = 'http://localhost:40000'
    }

    clear() {
        this._items = {}
    }

    render() {
    }

}
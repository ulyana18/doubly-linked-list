const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {
        let node = new Node(data);

        if(this._head === null) {
            this._head = node;
            this._tail = node;
        }
        else {
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        }
        this.length++;
        return node;
    }

    head() {
        if(this._head === null) return null;
        return this._head.data;
    }

    tail() {
        if(this._tail === null) return null;
        return this._tail.data;
    }

    at(index) {
        let i = 0;
        let elem = this._head;
        while(elem !== this._tail.next) {
            if(i === index)
                return elem.data;
            elem = elem.next;
            i++;
        }
    }

    insertAt(index, data) {
        let i = 0;
        let elem = this._head;
        while(i !== index-1) {
            elem = elem.next;
            i++;
        }

        let node = new Node(data);
        node.prev = elem;
        node.next = elem.next;
        elem.next = node;
        node.next.prev = node;
        this.length++;
        return this;
    }

    isEmpty() {
        if(this.length === 0) return true;
        else return false;
    }

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        let i = 0;
        let elem = this._head;
        while(i !== index-1) {
            elem = elem.next;
            i++;
        }
        let elemToDelete = elem.next;
        elem.next = elemToDelete.next;
        elemToDelete.next.prev = elem;
        elemToDelete = null;
        this.length--;
        return this;
    }

    reverse() {
        let elem = this._head;
        let firstElem = elem;
        
        while(elem.next.next !== null) {
            let change = elem.next;
            firstElem.prev = change;
            elem.next = change.next;
            change.next.prev = elem;
            change.next = firstElem;
            change.prev = null;
            firstElem = change;
        }
        let change = elem.next;
        firstElem.prev = change;
        elem.next = null;
        change.next = firstElem;
        change.prev = null;
        firstElem = change;

        let head = this._head;
        this._head = this._tail;
        this._tail = head;
        return this;
    }

    indexOf(data) {
        let elem = this._head;
        let i = 0;
        while(elem !== null) {
            if(elem.data === data) return i;
            i++;
            elem = elem.next;
        }
        return -1;
    }
}

module.exports = LinkedList;

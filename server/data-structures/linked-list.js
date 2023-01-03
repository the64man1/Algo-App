class LinkedList {
    constructor () {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
}

class ListNode {
    constructor (val, next) {
        this.val = val;
        this.next = next;
    }
}

module.exports =  { LinkedList, ListNode }
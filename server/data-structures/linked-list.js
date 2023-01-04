class LinkedList {
    constructor () {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(val) {
        const node = new ListNode(val);
        if (!this.head) this.head = node;
        if (this.tail) this.tail.next = node;
        this.tail = node;
        this.length++;
    }
}

class ListNode {
    constructor (val, next) {
        this.val = (val===undefined ? 0 : val);
        this.next = (next===undefined ? null : next);
    }
}

module.exports =  { LinkedList, ListNode }
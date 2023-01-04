const { LinkedList, ListNode } = require('./data-structures')

const arrayToLinkedList = ( arr ) => {
    //TODO: verify functionality
    const linkedList = new LinkedList();
    arr.forEach(val => {
        linkedList.append(val);
    });
    return linkedList;
}

const linkedListToArray = ( linkedList ) => {
    //TODO: verify functionality
    const arr = [];
    for (const node in linkedList) {
        arr.push(node.val);
    }
    return arr;
}

module.exports = { arrayToLinkedList, linkedListToArray }
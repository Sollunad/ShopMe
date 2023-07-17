const store = require('../../store/store');
const itemBuilder = require('../../services/itemBuilder');
const listBuilder = require('../../services/listBuilder');

exports.getItems = getItems;
exports.addList = addList;
exports.addItem = addItem;
exports.addItems = addItems;
exports.setChecked = setChecked;
exports.deleteList = deleteList;
exports.deleteItem = deleteItem;

function getItems() {
    return store.get(store.types.items);
}

function addList(name) {
    const lists = store.get(store.types.items);
    const list = listBuilder.newList(name);
    lists.push(list);
    store.set(store.types.items, lists);
}

function addItem(listId, name) {
    const lists = store.get(store.types.items);
    const list = lists.find(l => l.id === listId);
    console.log(list);
    const item = itemBuilder.newItem(name);
    list.items.push(item);
    store.set(store.types.items, lists);
}

function addItems(listId, names) {
    const lists = store.get(store.types.items);
    const list = lists.find(l => l.id === listId);
    console.log(list);

    for (const name of names) {
        const item = itemBuilder.newItem(name);
        list.items.push(item);
    }
    store.set(store.types.items, lists);
}

function setChecked(id, checked) {
    const lists = store.get(store.types.items);
    for (const list of lists) {
        const item = list.items.find(i => i.id === id);
        if (item) item.checked = checked;
    }
    store.set(store.types.items, lists);
}

function deleteList(id) {
    let lists = store.get(store.types.items);
    lists = lists.filter(l => l.id !== id);
    store.set(store.types.items, lists);
}

function deleteItem(id) {
    let lists = store.get(store.types.items);
    lists = lists.map(l => {
        const list = l;
        list.items = list.items.filter(i => i.id !== id);
        return list;
    });
    store.set(store.types.items, lists);
}
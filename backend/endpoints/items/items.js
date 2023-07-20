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
exports.emptyList = emptyList;

function getItems() {
    return store.get(store.types.items);
}

function addList(name) {
    const lists = store.get(store.types.items);
    const list = listBuilder.newList(name);
    lists.push(list);
    store.set(store.types.items, lists);
}

function addItem(listId, item) {
    const lists = store.get(store.types.items);
    const list = lists.find(l => l.id === listId);
    const existingItem = list.items.find(i => i.unit === item.unit && i.name === item.name);
    if (existingItem) {
        if (existingItem.amount || item.amount) {
            existingItem.amount = (existingItem.amount || 0) + (parseInt(item.amount || 0))
        }
    } else {
        const builtItem = itemBuilder.newItem(item);
        list.items.push(builtItem);
    }
    store.set(store.types.items, lists);
}

// not used anymore
function addItems(listId, names) {
    const lists = store.get(store.types.items);
    const list = lists.find(l => l.id === listId);

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

function emptyList(id) {
    let lists = store.get(store.types.items);
    const list = lists.find(l => l.id === id);
    list.items = [];
    store.set(store.types.items, lists);
}
import con from '../connector';

export default { getItems, addItem, addItems, deleteItem, setChecked, addList, deleteList, emptyList };

async function getItems() {
    return await con('items', 'get', {});
}

async function addItem(list, item) {
    return await con('items', 'post', {list, item});
}

async function addItems(list, items) {
    return await con('items/bulk', 'post', {list, items})
}

async function deleteItem(id) {
    return await con('items', 'delete', {id});
}

async function setChecked(id, checked) {
    return await con('items/checked', 'put', {id, checked});
}

async function addList(name) {
    return await con('items/lists', 'post', {name});
}

async function deleteList(id) {
    return await con('items/lists', 'delete', {id});
}

async function emptyList(id) {
    return await con('items/bulk', 'delete', {id});
}

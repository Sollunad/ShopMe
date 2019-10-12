import con from '../connector';

export default { getItems, addItem, deleteItem, setChecked, addList, deleteList };

async function getItems() {
    return await con('items', 'get', {});
}

async function addItem(list, name) {
    return await con('items', 'post', {list, name});
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

const _items = require('./items');

module.exports = [
    {function: getItems, path: '', method: 'get'},
    {function: addItem, path: '', method: 'post'},
    {function: addItems, path: '/bulk', method: 'post'},
    {function: emptyList, path: '/bulk', method: 'delete'},
    {function: deleteItem, path: '', method: 'delete'},
    {function: setChecked, path: '/checked', method: 'put'},
    {function: addList, path: '/lists', method: 'post'},
    {function: deleteList, path: '/lists', method: 'delete'}
];

async function getItems() {
    return _items.getItems();
}

async function addItem(req) {
    const list = req.body.list;
    const item = req.body.item;
    if (list && item) {
        await _items.addItem(list, item);
    }
    return _items.getItems();
}

async function addItems(req) {
    const list = req.body.list;
    const items = req.body.items;
    if (list && items) {
        for (const item of items) {
            await _items.addItem(list, item);
        }
    }
}

async function emptyList(req) {
    const id = req.body.id;
    if (id) {
        await _items.emptyList(id);
    }
    return _items.getItems();
}

async function deleteItem(req) {
    const id = req.body.id;
    if (id) {
        await _items.deleteItem(id);
    }
    return _items.getItems();
}

async function setChecked(req) {
    const id = req.body.id;
    const checked = req.body.checked;
    if (id && (checked === true || checked === false)) {
        await _items.setChecked(id, checked);
    }
    return _items.getItems();
}

async function addList(req) {
    const name = req.body.name;
    if (name) {
        await _items.addList(name);
    }
    return _items.getItems();
}

async function deleteList(req) {
    const id = req.body.id;
    if (id) {
        await _items.deleteList(id);
    }
    return _items.getItems();
}
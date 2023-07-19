const _items = require('./items');

module.exports = [
    {function: getItems, path: '', method: 'get'},
    {function: addItem, path: '', method: 'post'},
    {function: addItems, path: '/bulk', method: 'post'},
    {function: deleteItem, path: '', method: 'delete'},
    {function: setChecked, path: '/checked', method: 'put'},
    {function: addList, path: '/lists', method: 'post'},
    {function: deleteList, path: '/lists', method: 'delete'}
];

function getItems(req) {
    return _items.getItems();
}

function addItem(req) {
    const list = req.body.list;
    const name = req.body.name;
    if (list && name) {
        _items.addItem(list, name);
    }
    return _items.getItems();
}

function addItems(req) {
    const list = req.body.list;
    const names = req.body.names;
    if (list && names) {
        _items.addItems(list, names);
    }
    return _items.getItems();
}

function deleteItem(req) {
    const id = req.body.id;
    if (id) {
        _items.deleteItem(id);
    }
    return _items.getItems();
}

function setChecked(req) {
    const id = req.body.id;
    const checked = req.body.checked;
    if (id && (checked === true || checked === false)) {
        _items.setChecked(id, checked);
    }
    return _items.getItems();
}

function addList(req) {
    const name = req.body.name;
    if (name) {
        _items.addList(name);
    }
    return _items.getItems();
}

function deleteList(req) {
    const id = req.body.id;
    if (id) {
        _items.deleteList(id);
    }
    return _items.getItems();
}
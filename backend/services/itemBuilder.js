const uuid = require('uuid/v4');

exports.new = newItem;

function newItem(name) {
    const id = uuid();
    return {
        id, name, checked: false
    }
}
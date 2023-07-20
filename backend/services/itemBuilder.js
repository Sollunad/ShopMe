const uuid = require('uuid/v4');

exports.newItem = newItem;

function newItem(item) {
    const id = uuid();
    return {
        id, name: item.name, unit: item.unit, amount: item.amount ? parseInt(item.amount) : undefined, checked: false
    }
}
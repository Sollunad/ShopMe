const uuid = require('uuid/v4');

exports.newItem = newItem;
exports.newIngredient = newIngredient;

function newItem(name) {
    const id = uuid();
    return {
        id, name, checked: false
    }
}

function newIngredient(name) {
    const id = uuid();
    return {
        id, name, checked: false
    }
}
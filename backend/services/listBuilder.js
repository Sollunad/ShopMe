const uuid = require('uuid/v4');

exports.newList = newList;
exports.newRecipe = newRecipe;

function newList(name) {
    const id = uuid();
    return {
        id, name, items: []
    }
}

function newRecipe(name) {
    // ingredients: list, instructions: string
    const id = uuid();
    return {
        id, name, ingredients: [], instructions: ''
    }
}
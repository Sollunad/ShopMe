const store = require('../../store/store');
const itemBuilder = require('../../services/itemBuilder');
const listBuilder = require('../../services/listBuilder');

exports.getRecipes = getRecipes;
exports.addRecipe = addRecipe;
exports.deleteRecipe = deleteRecipe;

function getRecipes() {
    return store.get(store.types.recipes);
}

function addRecipe(ingredients, name, instructions) {
    const lists = store.get(store.types.recipes);
    const list = listBuilder.newRecipe(name, ingredients, instructions);
    lists.push(list);
    store.set(store.types.recipes, lists);
}

function deleteRecipe(id) {
    let lists = store.get(store.types.recipes);
    lists = lists.filter(l => l.id !== id);
    store.set(store.types.recipes, lists);
}
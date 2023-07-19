const _recipes = require('./recipes');
const _items = require("../items/items");

module.exports = [
    {function: getRecipes, path: '', method: 'get'},
    {function: addRecipe, path: '', method: 'post'},
    {function: deleteRecipe, path: '', method: 'delete'},
    {function: addIngredient, path: '/ingredients', method: 'post'},
    {function: deleteIngredient, path: '/ingredients', method: 'delete'},
    {function: changeInstruction, path: '/instructions', method: 'post'},
    {function: setChecked, path: '/checked', method: 'put'}
];

function getRecipes(req) {
    return _recipes.getRecipes();
}

function addRecipe(req) {
    const ingredients = req.body.ingredients;
    const name = req.body.name;
    const instructions = req.body.instructions
    if (ingredients && name && instructions) {
        _recipes.addRecipe(ingredients, name, instructions);
    }
    return _recipes.getRecipes();
}

function deleteRecipe(req) {
    const id = req.body.id;
    if (id) {
        _recipes.deleteRecipe(id);
    }
    return _recipes.getRecipes();
}

function addIngredient(req) {
    const recipe = req.body.recipe;
    const name = req.body.name;
    if (recipe && name) {
        _recipes.addIngredient(recipe, name);
    }
    return _recipes.getRecipes();
}

function deleteIngredient(req) {
    const id = req.body.id;
    if (id) {
        _recipes.deleteIngredient(id);
    }
    return _recipes.getRecipes();
}

function changeInstruction(req) {
    const recipe = req.body.recipe;
    const instructions = req.body.instructions;
    if (recipe && instructions) {
        _recipes.changeInstruction(recipe, instructions);
    }
    return _recipes.getRecipes()
}

function setChecked(req) {
    const id = req.body.id;
    const checked = req.body.checked;
    if (id && (checked === true || checked === false)) {
        _recipes.setChecked(id, checked);
    }
    return _recipes.getRecipes();
}

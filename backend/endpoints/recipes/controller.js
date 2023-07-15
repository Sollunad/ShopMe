const _recipes = require('./recipes');

module.exports = [
    {function: getRecipes, path: '', method: 'get'},
    {function: addRecipe, path: '', method: 'post'},
    {function: deleteRecipe, path: '', method: 'delete'}
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
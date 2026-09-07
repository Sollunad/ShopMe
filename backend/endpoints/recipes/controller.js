const _recipes = require('./recipes');

module.exports = [
    {function: getRecipes, path: '', method: 'get'},
    {function: addRecipe, path: '', method: 'post'},
    {function: deleteRecipe, path: '', method: 'delete'},
    {function: addIngredient, path: '/ingredients', method: 'post'},
    {function: deleteIngredient, path: '/ingredients', method: 'delete'},
    {function: changeInstruction, path: '/instructions', method: 'post'},
    {function: setChecked, path: '/checked', method: 'put'}
];

async function getRecipes() {
    return _recipes.getRecipes();
}

async function addRecipe(req) {
    const name = req.body.name;
    if (name) {
        await _recipes.addRecipe(name);
    }
    return _recipes.getRecipes();
}

async function deleteRecipe(req) {
    const id = req.body.id;
    if (id) {
        await _recipes.deleteRecipe(id);
    }
    return _recipes.getRecipes();
}

async function addIngredient(req) {
    const recipe = req.body.recipe;
    const ingredient = req.body.ingredient;
    if (recipe && ingredient) {
        await _recipes.addIngredient(recipe, ingredient);
    }
    return _recipes.getRecipes();
}

async function deleteIngredient(req) {
    const id = req.body.id;
    if (id) {
        await _recipes.deleteIngredient(id);
    }
    return _recipes.getRecipes();
}

async function changeInstruction(req) {
    const recipe = req.body.recipe;
    const instructions = req.body.instructions;
    if (recipe && instructions) {
        await _recipes.changeInstruction(recipe, instructions);
    }
    return _recipes.getRecipes()
}

async function setChecked(req) {
    const id = req.body.id;
    const checked = req.body.checked;
    if (id && (checked === true || checked === false)) {
        await _recipes.setChecked(id, checked);
    }
    return _recipes.getRecipes();
}

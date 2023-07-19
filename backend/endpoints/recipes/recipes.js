const store = require('../../store/store');
const itemBuilder = require('../../services/itemBuilder');
const listBuilder = require('../../services/listBuilder');

exports.getRecipes = getRecipes;
exports.addRecipe = addRecipe;
exports.deleteRecipe = deleteRecipe;
exports.addIngredient = addIngredient;
exports.deleteIngredient = deleteIngredient;
exports.changeInstruction = changeInstructions;
exports.setChecked = setChecked;

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

function addIngredient(recipeId, name) {
    const recipes = store.get(store.types.recipes);
    const recipe = recipes.find(l => l.id === recipeId);
    console.log(recipe);
    const ingredient = itemBuilder.newIngredient(name);
    recipe.ingredients.push(ingredient);
    store.set(store.types.recipes, recipes);
}

function deleteIngredient(id) {
    let recipes = store.get(store.types.recipes);
    recipes = recipes.map(l => {
        const recipe = l;
        recipe.ingredients = recipe.ingredients.filter(i => i.id !== id);
        return recipe;
    });
    store.set(store.types.recipes, recipes);
}

function changeInstructions(recipeId, instructions) {
    const recipes = store.get(store.types.recipes);
    const recipe = recipes.find(l => l.id === recipeId);
    console.log(recipe);
    if (recipe) recipe.instructions = instructions;
    store.set(store.types.recipes, recipes);
}

function setChecked(id, checked) {
    const recipes = store.get(store.types.recipes);
    for (const recipe of recipes) {
        const ingredient = recipe.ingredients.find(i => i.id === id);
        if (ingredient) ingredient.checked = checked;
    }
    store.set(store.types.recipes, recipes);
}
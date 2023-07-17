import con from '../connector';

export default { getRecipes, addRecipe, deleteRecipe, addIngredient, deleteIngredient, setChecked };

async function getRecipes() {
    return await con('recipes', 'get', {});
}

async function addRecipe(ingredients, name, instructions) {
    return await con('recipes', 'post', {ingredients, name, instructions});
}

async function deleteRecipe(id) {
    return await con('recipes', 'delete', {id});
}

async function addIngredient(recipe, name) {
    return await con('recipes/ingredients', 'post', {recipe, name});
}

async function deleteIngredient(id) {
    return await con('recipes/ingredients', 'delete', {id});
}

async function setChecked(id, checked) {
    return await con('recipes', 'put', {id, checked});
}

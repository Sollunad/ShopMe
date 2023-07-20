import con from '../connector';

export default { getRecipes, addRecipe, deleteRecipe, addIngredient, deleteIngredient, changeInstruction , setChecked };

async function getRecipes() {
    return await con('recipes', 'get', {});
}

async function addRecipe(name) {
    return await con('recipes', 'post', {name});
}

async function deleteRecipe(id) {
    return await con('recipes', 'delete', {id});
}

async function addIngredient(recipe, ingredient) {
    return await con('recipes/ingredients', 'post', {recipe, ingredient});
}

async function deleteIngredient(id) {
    return await con('recipes/ingredients', 'delete', {id});
}

async function changeInstruction(recipe, instructions) {
    return await con('recipes/instructions', 'post', {recipe, instructions})
}

async function setChecked(id, checked) {
    return await con('recipes/checked', 'put', {id, checked});
}

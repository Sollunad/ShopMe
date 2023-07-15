import con from '../connector';

export default { getRecipes, addRecipe, deleteRecipe };

async function getRecipes() {
    return await con('recipes', 'get', {});
}

async function addRecipe(ingredients, name, instructions) {
    return await con('recipes', 'post', {ingredients, name, instructions});
}

async function deleteRecipe(id) {
    return await con('recipes', 'delete', {id});
}
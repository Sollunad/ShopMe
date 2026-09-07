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

const NO_ID = { projection: { _id: 0 } };

async function getRecipes() {
    const collection = await store.getCollection(store.types.recipes);
    return collection.find({}, NO_ID).toArray();
}

async function addRecipe(name) {
    const collection = await store.getCollection(store.types.recipes);
    const recipe = listBuilder.newRecipe(name);
    await collection.insertOne({ ...recipe, _id: recipe.id });
}

async function deleteRecipe(id) {
    const collection = await store.getCollection(store.types.recipes);
    await collection.deleteOne({ _id: id });
}

async function addIngredient(recipeId, ingredient) {
    const collection = await store.getCollection(store.types.recipes);
    const builtIngredient = itemBuilder.newItem(ingredient);
    await collection.updateOne({ _id: recipeId }, { $push: { ingredients: builtIngredient } });
}

async function deleteIngredient(id) {
    const collection = await store.getCollection(store.types.recipes);
    await collection.updateMany({ 'ingredients.id': id }, { $pull: { ingredients: { id } } });
}

async function changeInstructions(recipeId, instructions) {
    const collection = await store.getCollection(store.types.recipes);
    await collection.updateOne({ _id: recipeId }, { $set: { instructions } });
}

async function setChecked(id, checked) {
    const collection = await store.getCollection(store.types.recipes);
    await collection.updateMany(
        { ingredients: { $elemMatch: { id } } },
        { $set: { 'ingredients.$[elem].checked': checked } },
        { arrayFilters: [{ 'elem.id': id }] }
    );
}
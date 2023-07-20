<template>
    <div class="ingredientList">
        <RecipeToolbar :recipe="recipe" :lists="lists" @setRecipes="setRecipes" @setItems="setItems"></RecipeToolbar>
        <Ingredient v-for="ingredient in recipe.ingredients" :key="ingredient.id" :ingredient="ingredient" class="ingredient" @setRecipes="setRecipes" ></Ingredient>
    </div>
</template>

<script>
import Ingredient from "./Ingredient";
import RecipeToolbar from "./RecipeToolbar";
export default {
    name: "IngredientList",
    components: {RecipeToolbar, Ingredient},
    props: ['recipe', 'lists'],
    methods: {
        setRecipes: function(recipes) {
            this.$emit('setRecipes', recipes);
        },
        setItems: function(items) {
            this.$emit('setItems', items);
        }
    }
}
</script>

<style scoped>
    .ingredientList {
        padding: 10px;
    }

    .ingredient {
        margin-bottom: -15px;
    }
</style>
<template>
    <div>
        <RecipeOverview :recipes="recipes" @setRecipes="setRecipes" @refresh="loadRecipes"></RecipeOverview>
        Hello Recipes!
    </div>
</template>

<script>
import RecipeOverview from "../components/RecipeOverview.vue";
import _recipes from "../services/endpoints/recipes";

export default {
    name: 'RecipePage',
    components: {RecipeOverview},
    data: () => ({
        recipes: []
    }),
    methods: {
        loadRecipes: async function() {
            this.recipes = await _recipes.getRecipes();
        },
        setRecipes: function(recipes) {
            this.recipes = recipes;
        }
    },
    mounted: async function() {
        await this.loadRecipes();
    }
}
</script>

<style scoped>
</style>

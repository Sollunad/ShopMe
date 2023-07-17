<template>
    <div>
        <Toolbar2 class="toolbar" @setRecipes="setRecipes" @refresh="loadRecipes"></Toolbar2>
        <RecipeOverview :recipes="recipes" @setRecipes="setRecipes" @refresh="loadRecipes"></RecipeOverview>

    </div>
</template>

<script>
import RecipeOverview from "../components/RecipeOverview.vue";
import _recipes from "../services/endpoints/recipes";
import Toolbar2 from "@/components/Toolbar2.vue";
import _items from "@/services/endpoints/items";

export default {
    name: 'RecipePage',
    components: {Toolbar2, RecipeOverview},
    data: () => ({
        tab: null,
        recipes: []
    }),
    methods: {
        loadRecipes: async function() {
            this.recipes = await _recipes.getRecipes();
        },
        setRecipes: function(recipes) {
            this.recipes = recipes;
        },
        setItems: function(ingredients) {
            this.recipes = ingredients;
        }
    },
    mounted: async function() {
        await this.loadRecipes();
    }
}
</script>

<style scoped>
.toolbar {
    margin: 16px;
}
</style>

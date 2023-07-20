<template>
    <div>
        <Toolbar2 class="toolbar" @setRecipes="setRecipes" @refresh="loadRecipes"></Toolbar2>
        <RecipeOverview :recipes="recipes" :lists="lists" @setRecipes="setRecipes" @refresh="loadRecipes"></RecipeOverview>

    </div>
</template>

<script>
import RecipeOverview from "../components/RecipeOverview.vue";
import _recipes from "../services/endpoints/recipes";
import _items from "../services/endpoints/items"
import Toolbar2 from "@/components/Toolbar2.vue";

export default {
    name: 'RecipePage',
    components: {Toolbar2, RecipeOverview},
    data: () => ({
        tab: null,
        recipes: [],
        lists: []
    }),
    methods: {
        loadRecipes: async function() {
            this.setRecipes(await _recipes.getRecipes());
        },
        loadLists: async function() {
            this.lists = await _items.getItems();
        },
        setRecipes: function(recipes) {
            this.recipes = recipes;
            this.recipes = this.recipes.sort((a, b) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();

                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
        },
    },
    mounted: async function() {
        await this.loadRecipes();
        await this.loadLists();
    }
}
</script>

<style scoped>
.toolbar {
    margin: 16px;
}
</style>

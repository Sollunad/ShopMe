<template>
    <div class="grey darken-4">
        <v-autocomplete
            class="autocomplete"
            :items="recipeNames"
            v-model="currentRecipeName"
        ></v-autocomplete>
        <div v-if="currentRecipe">
            <IngredientList :recipe="currentRecipe" :lists="lists" @setRecipes="setRecipes"></IngredientList>
            <Instruction :recipe="currentRecipe" @setRecipes="setRecipes" ></Instruction>
        </div>
    </div>
</template>

<script>
    import IngredientList from "./IngredientList";
    import Instruction from "@/components/Instruction.vue";
    export default {
        name: "RecipeOverview",
        components: {IngredientList, Instruction},
        props: ['recipes', 'lists'],
        data: () => ({
            currentRecipeName: '',
        }),
        methods: {
            setRecipes: function(recipes) {
                this.$emit('setRecipes', recipes);
            },
        },
        computed: {
            recipeNames: function() {
                return this.recipes.map(recipe => recipe.name);
            },
            currentRecipe: function() {
                return this.recipes.find(recipe => recipe.name === this.currentRecipeName);
            }
        }
}
</script>

<style scoped>
.autocomplete {
    margin: 0 16px;
}
</style>
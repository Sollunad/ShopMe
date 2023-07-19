<template>
    <div>
        <v-tabs>
            <v-tab v-for="recipe in recipes" :key="recipe.id">
                {{recipe.name}}
            </v-tab>

            <v-tab-item v-for="recipe in recipes" :key="recipe.id">
                <IngredientList :recipe="recipe" @setRecipes="setRecipes"></IngredientList>
                <Instruction :recipe="recipe" @setRecipes="setRecipes" ></Instruction>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
    import IngredientList from "./IngredientList";
    import Instruction from "@/components/Instruction.vue";
    import _recipes from "../services/endpoints/recipes";
    export default {
        name: "RecipeOverview",
        components: {IngredientList, Instruction},
        props: ['recipes'],
        methods: {
            setRecipes: function(recipes) {
                this.$emit('setRecipes', recipes);
            }
        }
}
</script>

<style scoped>

</style>
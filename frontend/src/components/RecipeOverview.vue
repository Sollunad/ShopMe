<template>
    <div>
        <v-tabs>
            <v-tab v-for="recipe in recipes" :key="recipe.id">
                {{recipe.name}}
            </v-tab>

            <v-tab-item v-for="recipe in recipes" :key="recipe.id">
                <IngredientList :recipe="recipe" @setRecipes="setRecipes"></IngredientList>
                <v-textarea
                    background-color="grey darken-3"
                    solo
                    name="input-7-4"
                    :value="instructionsText"
                ></v-textarea>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
    import IngredientList from "./IngredientList";
    import _recipes from "../services/endpoints/recipes";
    export default {
        name: "RecipeOverview",
        components: {IngredientList},
        props: ['recipes'],
        data: () => ({
            instructionsText: 'Hier steht der Beispieltext',
        }),
        methods: {
            setRecipes: function(recipes) {
                this.$emit('setRecipes', recipes);
            }
        }
}
</script>

<style scoped>

</style>
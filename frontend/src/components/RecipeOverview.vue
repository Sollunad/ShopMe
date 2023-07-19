<template>
    <div>
        <v-tabs>
            <v-tab v-for="recipe in recipes" :key="recipe.id">
                {{recipe.name}}
            </v-tab>

            <v-tab-item v-for="recipe in recipes" :key="recipe.id">
                <IngredientList :recipe="recipe" :lists="lists" @setRecipes="setRecipes" @setItems="setItems" ></IngredientList>
                <Instruction :recipe="recipe" @setRecipes="setRecipes" ></Instruction>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
    import IngredientList from "./IngredientList";
    import Instruction from "@/components/Instruction.vue";
    export default {
        name: "RecipeOverview",
        components: {IngredientList, Instruction},
        props: ['recipes', 'lists'],
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

</style>
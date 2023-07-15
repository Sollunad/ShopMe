<template>
    <div>
        <v-btn v-if="!creating" @click="startCreating">Neues Rezept</v-btn>
        <v-btn @click="openLists">Zurück zu Listen</v-btn>
        <v-tabs>
            <v-tab v-for="list in recipes" :key="list.id">
                {{list.name}}
            </v-tab>

            <v-tab-item v-for="list in recipes" :key="list.id">
                <ShoppingList :list="list" @setRecipes="setRecipes"></ShoppingList>
            </v-tab-item>

            <v-text-field
                v-if="creating"
                label="Solo"
                placeholder="Name des Rezepts"
                solo
                v-model="recipeName"
            ></v-text-field>
            <v-btn v-if="creating" @click="createRecipe">{{buttonText}}</v-btn>
        </v-tabs>
    </div>
</template>

<script>
    import ShoppingList from "./ShoppingList";
    import _recipes from "../services/endpoints/recipes";
    export default {
        name: "RecipeOverview",
        data: () => ({
            creating: false,
            recipeName: ''
        }),
        computed: {
            buttonText: function() {
                return this.recipeName? 'Speichern' : 'Abbrechen';
            }
        },
        components: {ShoppingList},
        props: ['recipes'],
        methods: {
            startCreating: function() {
                this.creating = true;
            },
            createRecipe: async function() {
                this.creating = false;
                if (this.recipeName) {
                    const recipe = await _recipes.addRecipe('test', this.recipeName, 'instructions');
                    this.$emit('setRecipes', recipe);
                    this.recipeName = '';
                }
            },
            openLists: async function() {
                // TODO fix
                await this.$router.push({path: '/'});
            },
            setRecipes: function(recipes) {
                this.$emit('setRecipes', recipes);
            }
        }
}
</script>

<style scoped>

</style>
<template>
    <div>
        <v-btn @click="openLists" class="mr-3 mb-3">Zurück zu Listen</v-btn>
        <v-btn v-if="!creating" @click="startCreating" class="mr-3 mb-3">Neues Rezept</v-btn>
        <v-text-field
            v-if="creating"
            label="Solo"
            placeholder="Name des Rezepts"
            solo
            v-model="recipeName"
        ></v-text-field>
        <v-btn v-if="creating" @click="createRecipe" class="mr-3 mb-3">{{buttonText}}</v-btn>
        <v-btn text icon><v-icon @click="refresh" class="mr-3 mb-3">mdi-refresh</v-icon></v-btn>
    </div>
</template>

<script>
import _recipes from '../services/endpoints/recipes';

export default {
    name: "RecipeCreator",
    data: () => ({
        creating: false,
        recipeName: ''
    }),
    computed: {
        buttonText: function() {
            return this.recipeName? 'Speichern' : 'Abbrechen';
        }
    },
    components: {},
    props: ['recipes'],
    methods: {
        startCreating: function() {
            this.creating = true;
        },
        createRecipe: async function() {
            this.creating = false;
            if (this.recipeName) {
                const recipe = await _recipes.addRecipe(this.recipeName);
                this.$emit('setRecipes', recipe);
                this.recipeName = '';
            }
        },
        openLists: async function() {
            await this.$router.push({path: '/'});
        },
        setRecipes: function(recipes) {
            this.$emit('setRecipes', recipes);
        },
        refresh: function() {
            this.$emit('refresh');
        }
    }
}
</script>

<style scoped>

</style>
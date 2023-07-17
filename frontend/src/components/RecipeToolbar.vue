<template>
    <div>
        <v-btn v-if="!creating" @click="startCreating" text>Neue Zutat</v-btn>
        <v-text-field
            v-if="creating"
            label="Solo"
            placeholder="Name"
            solo
            v-model="ingredientName"
        ></v-text-field>
        <v-btn v-if="creating" @click="addIngredient" text>{{createButtonText}}</v-btn>
        <v-btn @click="deleteRecipe" :color="deleteButtonColor" text>{{deleteButtonText}}</v-btn>
    </div>
</template>

<script>
import _recipes from '../services/endpoints/recipes';

export default {
    name: "RecipeToolbar",
    props: ['recipe'],
    data: () => ({
        creating: false,
        deleting: false,
        ingredientName: ''
    }),
    computed: {
        createButtonText: function() {
            return this.ingredientName ? 'Speichern' : 'Abbrechen';
        },
        deleteButtonText: function() {
            return this.deleting? 'Sicher?' : 'Rezept löschen';
        },
        deleteButtonColor: function() {
            return this.deleting? 'error' : '';
        }
    },
    methods: {
        startCreating: function() {
            this.creating = true;
        },
        addIngredient: async function() {
            this.creating = false;
            if (this.ingredientName) {
                const recipes = await _recipes.addIngredient(this.recipe.id, this.ingredientName);
                this.$emit('setRecipes', recipes);
                this.ingredientName = '';
            }
        },
        deleteRecipe: async function()
        {
            if (this.deleting) {
                const recipes = await _recipes.deleteRecipe(this.recipe.id);
                this.$emit('setRecipes', recipes);

            } else {
                this.deleting = true;
                const that = this;
                window.setTimeout(function() {
                    that.deleting = false;
                }, 3000);
            }
        }

    }
}
</script>

<style scoped>

</style>
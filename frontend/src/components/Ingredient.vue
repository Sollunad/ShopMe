<template>
    <div>
        <v-checkbox
            v-model="checked"
            @change="changeChecked"
        >
            <template v-slot:label>
                <span
                    v-bind:class="{checked}">
                    {{ingredient.name}}
                </span>
                <v-btn text icon @click.stop="deleteIngredient">
                    <v-icon color="error">mdi-delete</v-icon>
                </v-btn>
            </template>
        </v-checkbox>
    </div>
</template>

<script>
import _recipes from '../services/endpoints/recipes';

export default {
    name: "Ingredient",
    props: ['ingredient'],
    data: () => ({
        checked: false
    }),
    methods: {
        changeChecked: function() {
            _recipes.setChecked(this.ingredient.id, this.checked);
        },
        deleteIngredient: async function() {
            const recipes = await _recipes.deleteIngredient(this.ingredient.id);
            this.$emit('setRecipes', recipes);
        }
    },
    mounted: function() {
        this.checked = this.ingredient.checked;
    }
}
</script>

<style scoped>
.checked {
    text-decoration: line-through;
}
</style>
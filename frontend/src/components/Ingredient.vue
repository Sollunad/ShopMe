<template>
    <div>
        <v-checkbox
            v-model="ingredient.checked"
            @change="changeChecked"
        >
            <template v-slot:label>
                <span>
                    {{ingredient.amount}}
                    {{ingredient.unit}}
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
    methods: {
        changeChecked: async function() {
            const recipes = await _recipes.setChecked(this.ingredient.id, this.ingredient.checked);
            this.$emit('setRecipes', recipes);
        },
        deleteIngredient: async function() {
            const recipes = await _recipes.deleteIngredient(this.ingredient.id);
            this.$emit('setRecipes', recipes);
        }
    },
}
</script>
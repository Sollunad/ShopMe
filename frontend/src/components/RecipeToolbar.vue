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
        <v-btn @click="openPopup" text>{{exportButtonText}}</v-btn>
        <v-btn @click="deleteRecipe" :color="deleteButtonColor" text>{{deleteButtonText}}</v-btn>

        <v-dialog v-model="showPopup" max-width="500">
            <v-card>
                <v-card-title>Welche Einkaufsliste?</v-card-title>
                <v-card-text>
                        <v-container class="px-0" fluid>
                            <v-radio-group v-model="radioGroup">
                                <v-radio
                                    v-for="list in lists"
                                    :key="list.id"
                                    :label="list.name"
                                    :value="list.id"
                                ></v-radio>
                            </v-radio-group>
                        </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="exportRecipe">Exportieren</v-btn>
                    <v-btn @click="showPopup = false">Abbrechen</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import _recipes from '../services/endpoints/recipes';
import _items from '../services/endpoints/items';

export default {
    name: "RecipeToolbar",
    props: ['recipe', 'lists'],
    data: () => ({
        creating: false,
        deleting: false,
        ingredientName: '',
        exportButtonText: 'In Liste exportieren',
        showPopup: false,
        radioGroup: '',
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
        deleteRecipe: async function() {
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
        },
        openPopup: function() {
            this.showPopup = true;
        },
        exportRecipe: async function() {
            const unchecked = this.recipe.ingredients.filter(item => !item.checked).map(item => item.name);
            const selectedListId = this.radioGroup;
            if (unchecked && selectedListId) {
                const lists = await _items.addItems(selectedListId, unchecked);
                this.$emit('setItems', lists)
            }
            this.showPopup = false;
        },

    }
}
</script>

<style scoped>

</style>
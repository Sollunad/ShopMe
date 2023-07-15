<template>
    <div>
        <v-btn @click="deleteRecipe" :color="deleteButtonColor" text>{{deleteButtonText}}</v-btn>
    </div>
</template>

<script>
import _recipes from '../services/endpoints/recipes';

export default {
    name: "ItemCreator",
    props: ['list'],
    data: () => ({
        creating: false,
        deleting: false,
        itemName: ''
    }),
    computed: {
        deleteButtonText: function() {
            return this.deleting? 'Sicher?' : 'Rezept löschen';
        },
        deleteButtonColor: function() {
            return this.deleting? 'error' : '';
        }
    },
    methods: {
        deleteRecipe: async function()
        {
            if (this.deleting) {
                const recipes = await _recipes.deleteRecipe(this.list.id);
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
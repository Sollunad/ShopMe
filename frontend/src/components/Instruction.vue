<template>
    <div>
        <v-textarea
            background-color="grey darken-3"
            outlined
            name="input-7-4"
            label="Anleitung"
            v-model="localInstructions"
        ></v-textarea>
        <v-btn class="ma-2" outlined color="indigo" v-if="localInstructions !== recipe.instructions && localInstructions !== ''" @click="submitInstructions">
            Speichern
        </v-btn>
    </div>
</template>

<script>
import _recipes from "../services/endpoints/recipes";
export default {
    name: "Instruction",
    components: {},
    props: ['recipe'],
    data: () => ({
        localInstructions: '',
    }),
    methods: {
        submitInstructions: async function() {
            if (this.localInstructions) {
                const recipes = await _recipes.changeInstruction(this.recipe.id, this.localInstructions);
                this.$emit('setRecipes', recipes);
            }
        }
    },
    mounted: function() {
        this.localInstructions = this.recipe.instructions;
    }

}
</script>

<style scoped>

</style>
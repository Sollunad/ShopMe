<template>
    <div>
        <v-btn @click="openRecipes" class="mr-3 mb-3">Rezepte</v-btn>
        <v-btn v-if="!creating" @click="startCreating" class="mr-3 mb-3">Neue Einkaufsliste</v-btn>
        <v-text-field
                v-if="creating"
                label="Solo"
                placeholder="Name der Einkaufsliste"
                solo
                v-model="listName"
        ></v-text-field>
        <v-btn v-if="creating" @click="createList" class="mr-3 mb-3">{{buttonText}}</v-btn>
        <v-btn text icon><v-icon @click="refresh" class="mr-3 mb-3">mdi-refresh</v-icon></v-btn>
    </div>
</template>

<script>
    import _items from '../services/endpoints/items';

    export default {
        name: "ListCreator",
        data: () => ({
            creating: false,
            listName: ''
        }),
        computed: {
            buttonText: function() {
                return this.listName? 'Speichern' : 'Abbrechen';
            }
        },
        methods: {
            startCreating: function() {
                this.creating = true;
            },
            createList: async function() {
                this.creating = false;
                if (this.listName) {
                    const items = await _items.addList(this.listName);
                    this.$emit('setItems', items);
                    this.listName = '';
                }
            },
            openRecipes: async function() {
                await this.$router.push({path: 'recipes'});
            },
            refresh: function() {
                this.$emit('refresh');
            }
        }
    }
</script>

<style scoped>

</style>
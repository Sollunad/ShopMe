<template>
    <v-tabs>
        <v-tab v-for="list in items" :key="list.id">
            {{list.name}}
        </v-tab>

        <v-tab-item v-for="list in items" :key="list.id">
            <ShoppingList :list="list" @setItems="setItems"></ShoppingList>
        </v-tab-item>
    </v-tabs>
</template>

<script>
    import ShoppingList from "./ShoppingList";
    export default {
        name: "ListOverview",
        components: {ShoppingList},
        props: ['items'],
        methods: {
            setItems: function(items) {
                this.$emit('setItems', items);
            }
        }
    }
</script>

<style scoped>

</style>
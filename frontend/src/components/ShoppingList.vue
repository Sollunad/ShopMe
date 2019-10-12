<template>
    <div class="shoppingList">
        <ListToolbar :list="list" @setItems="setItems"></ListToolbar>
        <Item v-for="item in list.items" :key="item.id" :item="item" class="item"></Item>
    </div>
</template>

<script>
    import Item from "./Item";
    import ListToolbar from "./ListToolbar";
    export default {
        name: "ShoppingList",
        components: {ListToolbar, Item},
        props: ['list'],
        methods: {
            setItems: function(items) {
                this.$emit('setItems', items);
            }
        }
    }
</script>

<style scoped>
    .shoppingList {
        padding: 10px;
    }

    .item {
        margin-bottom: -15px;
    }
</style>
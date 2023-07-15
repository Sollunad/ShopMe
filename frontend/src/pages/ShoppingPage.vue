<template>
    <div>
        <Toolbar class="toolbar" @setItems="setItems" @refresh="loadItems"></Toolbar>
        <ListOverview :items="items" @setItems="setItems" @refresh="loadItems"></ListOverview>
    </div>
</template>

<script>
import _items from '../services/endpoints/items';
import ListOverview from "../components/ListOverview";
import Toolbar from "../components/Toolbar";

export default {
    name: 'ShoppingPage',
    components: {Toolbar, ListOverview},
    data: () => ({
        tab: null,
        items: []
    }),
    methods: {
        loadItems: async function() {
            this.items = await _items.getItems();
        },
        setItems: function(items) {
            this.items = items;
        }
    },
    mounted: async function() {
        await this.loadItems();
    }
}
</script>

<style scoped>
.toolbar {
    margin: 16px;
}
</style>

<template>
  <v-app class="app">
    <v-content>
      <Toolbar class="toolbar" @setItems="setItems"></Toolbar>
      <ListOverview :items="items" @setItems="setItems"></ListOverview>
    </v-content>
  </v-app>
</template>

<script>
import _items from './services/endpoints/items';
import ListOverview from "./components/ListOverview";
import Toolbar from "./components/Toolbar";

export default {
  name: 'app',
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
    this.loadItems();
  }
}
</script>

<style scoped>
  .toolbar {
    margin: 16px;
  }
</style>

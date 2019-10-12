<template>
    <v-checkbox
            v-model="checked"
            :label="item.name"
            @change="changeChecked"
    ></v-checkbox>
</template>

<script>
    import _items from '../services/endpoints/items';

    export default {
        name: "Item",
        props: ['item'],
        data: () => ({
            checked: false
        }),
        methods: {
            changeChecked: function() {
                _items.setChecked(this.item.id, this.checked);
            }
        },
        mounted: function() {
            this.checked = this.item.checked;
        }
    }
</script>

<style scoped>

</style>
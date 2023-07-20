<template>
    <div>
        <v-checkbox
                v-model="checked"
                @change="changeChecked"
        >
            <template v-slot:label>
                <span
                    v-bind:class="{checked}">
                    {{item.amount}}
                    {{item.unit}}
                    {{item.name}}
                </span>
                <v-btn text icon @click.stop="deleteItem">
                    <v-icon color="error">mdi-delete</v-icon>
                </v-btn>
            </template>
        </v-checkbox>
    </div>
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
            },
            deleteItem: async function() {
                const items = await _items.deleteItem(this.item.id);
                this.$emit('setItems', items);
            }
        },
        mounted: function() {
            this.checked = this.item.checked;
        }
    }
</script>

<style scoped>
    .checked {
        text-decoration: line-through;
    }
</style>
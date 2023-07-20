<template>
    <div>
        <v-btn v-if="!creating" @click="startCreating" text>Neuer Eintrag</v-btn>
        <v-text-field
                v-if="creating"
                label="Solo"
                placeholder="Name"
                solo
                v-model="itemName"
        ></v-text-field>
        <v-btn v-if="creating" @click="addItem" text>{{createButtonText}}</v-btn>
        <v-btn @click="deleteAllItems" :color="emptyButtonColor" text>{{emptyButtonText}}</v-btn>
        <v-btn @click="deleteList" :color="deleteButtonColor" text>{{deleteButtonText}}</v-btn>
    </div>
</template>

<script>
    import _items from '../services/endpoints/items';

    export default {
        name: "ItemCreator",
        props: ['list'],
        data: () => ({
            creating: false,
            deleting: false,
            emptying: false,
            itemName: ''
        }),
        computed: {
            createButtonText: function() {
                return this.itemName? 'Speichern' : 'Abbrechen';
            },
            deleteButtonText: function() {
                return this.deleting? 'Sicher?' : 'Liste löschen';
            },
            emptyButtonText: function() {
                return this.emptying? 'Sicher?' : 'Liste leeren';
            },
            deleteButtonColor: function() {
                return this.deleting? 'error' : '';
            },
            emptyButtonColor: function() {
                return this.emptying? 'error' : '';
            }
        },
        methods: {
            startCreating: function() {
                this.creating = true;
            },
            addItem: async function() {
                this.creating = false;
                if (this.itemName) {
                    const items = await _items.addItem(this.list.id, this.itemName);
                    this.$emit('setItems', items);
                    this.itemName = '';
                }
            },
            deleteList: async function() {
                if (this.deleting) {
                    const items = await _items.deleteList(this.list.id);
                    this.$emit('setItems', items);

                } else {
                    this.deleting = true;
                    const that = this;
                    const timer = window.setTimeout(function() {
                        that.deleting = false;
                    }, 3000);
                }
            },
            deleteAllItems: async function() {
                if (this.emptying) {
                    let items = this.list.items;
                    console.log(items)
                    for (const item of items) {
                        items = await _items.deleteItem(item.id);
                        console.log(items)
                    }
                    this.$emit('setItems', items);
                    this.emptying = false;
                } else {
                    this.emptying = true;
                    const that = this;
                    const timer = window.setTimeout(function() {
                        that.emptying = false;
                    }, 3000);
                }
            }
        }
    }
</script>

<style scoped>

</style>
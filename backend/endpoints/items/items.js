const store = require('../../store/store');
const itemBuilder = require('../../services/itemBuilder');
const listBuilder = require('../../services/listBuilder');

exports.getItems = getItems;
exports.addList = addList;
exports.addItem = addItem;
exports.setChecked = setChecked;
exports.deleteList = deleteList;
exports.deleteItem = deleteItem;
exports.emptyList = emptyList;

// Never return Mongo's _id to callers - it duplicates the existing "id"
// field (reused as _id for storage) and callers/frontend only know "id".
const NO_ID = { projection: { _id: 0 } };

async function getItems() {
    const collection = await store.getCollection(store.types.items);
    return collection.find({}, NO_ID).toArray();
}

async function addList(name) {
    const collection = await store.getCollection(store.types.items);
    const list = listBuilder.newList(name);
    await collection.insertOne({ ...list, _id: list.id });
}

async function addItem(listId, item) {
    const collection = await store.getCollection(store.types.items);

    const incomingAmount = parseInt(item.amount || 0) || 0;
    if (incomingAmount) {
        const result = await collection.updateOne(
            { _id: listId, items: { $elemMatch: { unit: item.unit, name: item.name } } },
            { $inc: { 'items.$[elem].amount': incomingAmount } },
            { arrayFilters: [{ 'elem.unit': item.unit, 'elem.name': item.name }] }
        );
        if (result.matchedCount > 0) return;
    } else {
        const existing = await collection.findOne(
            { _id: listId, items: { $elemMatch: { unit: item.unit, name: item.name } } }
        );
        if (existing) return;
    }

    const builtItem = itemBuilder.newItem(item);
    await collection.updateOne({ _id: listId }, { $push: { items: builtItem } });
}

async function setChecked(id, checked) {
    const collection = await store.getCollection(store.types.items);
    await collection.updateMany(
        { items: { $elemMatch: { id } } },
        { $set: { 'items.$[elem].checked': checked } },
        { arrayFilters: [{ 'elem.id': id }] }
    );
}

async function deleteList(id) {
    const collection = await store.getCollection(store.types.items);
    await collection.deleteOne({ _id: id });
}

async function deleteItem(id) {
    const collection = await store.getCollection(store.types.items);
    await collection.updateMany({ 'items.id': id }, { $pull: { items: { id } } });
}

async function emptyList(id) {
    const collection = await store.getCollection(store.types.items);
    await collection.updateOne({ _id: id }, { $set: { items: [] } });
}

const { MongoClient } = require('mongodb');

const storeTypes = {
    "items": "items",
    "recipes": "recipes"
};

exports.getCollection = getCollection;
exports.types = storeTypes;

const uri = process.env.SHOPME_MONGO_URI;
if (!uri) {
    throw new Error('SHOPME_MONGO_URI environment variable is required');
}

const client = new MongoClient(uri);
let dbPromise;

function getDb() {
    if (!dbPromise) {
        dbPromise = client.connect().then(() => client.db());
    }
    return dbPromise;
}

async function getCollection(type) {
    const db = await getDb();
    return db.collection(type);
}


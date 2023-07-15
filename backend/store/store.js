const fs = require('fs');

const storeTypes = {
    "items": "items",
    "recipes": "recipes"
};

exports.get = readJSON;
exports.set = writeJSON;
exports.types = storeTypes;

function readJSON(file) {
    const rawdata = fs.readFileSync(`store/${file}.json`);
    const json = JSON.parse(rawdata);
    return json;
}

function writeJSON(file, json) {
    const data = JSON.stringify(json);
    fs.writeFileSync(`store/${file}.json`, data);
}


const uuid = require('uuid/v4');

exports.new = newList;

function newList(name) {
    const id = uuid();
    return {
        id, name, items: []
    }
}
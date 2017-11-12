const map = new Map();

let obj = {};

// Any object types can be a keys.
map.set(obj, 123);
map.set(undefined, 100500);
map.set(null, 42);

console.log(map.entries()); // Returns MapIterator

for(let item of map){ // Support iterator protocol.
    console.log(item);
}

console.log(map.get(obj)); // 123
console.log(map.get(undefined)); // 123

obj = {};
console.log(map.get(obj)); // undefined

console.log(map.keys());
console.log(map.size);

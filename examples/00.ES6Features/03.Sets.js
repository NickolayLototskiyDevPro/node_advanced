const set = new Set();
set.add({a: 1, b: 2});
set.add({a: 1, b: 2});
console.log(set.keys());

const weakSet = new WeakSet();
let a = {};
weakSet.add(a);
weakSet.add({a: 1, b: 2});

console.log(weakSet.has(a));

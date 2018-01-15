const obj = {b: { c: { d : {v: 2} } } };

const {b:{c: {d: {v} } } } = obj;

const arr = [1,2,3,4,5,6,7,8,9,0];

const [a, b,,, ...c] = arr;
console.log(a,b,c);
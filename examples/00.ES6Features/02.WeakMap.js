const weakMap = new WeakMap();

let key = {};
weakMap.set(key, '123');
console.log(weakMap.get(key));
key = {};
console.log(weakMap.get(key));

const Person = (function () {
    const privateProps = new WeakMap();
  
    class Person {
      constructor(name) {
        this.name = name; // this is public
        privateProps.set(this, {age: 20}); // this is private
      }
      greet() {
        // Here we can access both name and age
        console.log(`name: ${this.name}, age: ${privateProps.get(this).age}`);
      }
    }
  
    return Person;
  })();
  
  let joe = new Person('Joe');
  joe.greet();
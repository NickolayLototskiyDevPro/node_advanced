const symbol1 = Symbol('new symbol');
const symbol2 = Symbol('new symbol');

//console.log(symbol1 === symbol2); // False
//console.log(symbol1 === symbol1); // True Symbol equals only itself

class Iterator {
    constructor(obj) {
        this.obj = obj;
    }

    [Symbol.iterator]() {
        if (!this.obj) {
            return { value: undefined, done: true }
        }

        let currentPosition = 0;

        return {
            next: () => {
                const key = Object.keys(this.obj)[currentPosition++];
                
                return {
                    value: this.obj[key],
                    done:  !Boolean(this.obj[key]) 
                }
            }
        }
    }
}

const array = [1,2,5]
array[10] = 56

for(let item of array){
    console.log(item);
}

let iterator = new Iterator(array);
for(let item of iterator){
    console.log(item);
}


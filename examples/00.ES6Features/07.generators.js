function* gen(){
    let x = yield(2);
    console.log(x);
    x = yield(3);
    console.log(x);
    x = yield(4);
    console.log(x);
    x = yield(5);
    console.log(x);
    return 'This is the end';
}

const a = gen();
console.log(a.next('Hello'));
console.log(a.next('How are you'));
console.log(a.next('See you'));
console.log(a.next('Later'));
console.log(a.next('Bye'));
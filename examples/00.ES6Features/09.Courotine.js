function * MyGen (){
    let x = 0;
    while(x < 100){
        x = yield;
        console.log(x);
    }

    return x
}

const aa = MyGen();
let i = 0;
let t =  setInterval(() => {
    i++;
    aa.next(i);
}, 500);

setTimeout (()=> {
    clearInterval(t)
    console.log('Good bye');
}, 5000);


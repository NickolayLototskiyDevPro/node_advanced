function fn() { return new Promise((res, rej)=>{
    setTimeout(()=> {
        console.log('Set timeout 2');
        return res();
    }, 2000);
});
}

function fn1() { return new Promise((res, rej)=>{
    setTimeout(()=> {
        console.log('Set timeout 1');
        return res();
    }, 1000);
})
}

function fn2() {return new Promise((res, rej)=>{
    setTimeout(()=> {
        console.log('Set timeout 0,5');
        return res();
    }, 500);
})
}


fn()
.then((data) => {
    return fn1();
})
.then((data) => {
    return fn2();
})
.then((data) => {
    console.log('Done')
})
function* gen(){
    let res = yield(true); 
}

function delay (){
    const g = gen();
    setTimeout(()=> {
        console.log('Hello');
        g.next();
    }, 500);
}

delay();
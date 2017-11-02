function delay(sec){
    return new Promise((res, rej) => {
        setTimeout(()=>{
            if(sec < 5000){
                return res('hello');
            } else {
               return rej(); 
            }
        }, sec);
    });
};

delay(8000)
.then((data) => {
    console.log(data);
    return delay(2000);
})
.catch( err => {
    return err.message;
})
.then(data => {
    console.log(data);
})

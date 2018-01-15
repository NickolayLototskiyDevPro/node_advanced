const delay = function(ms, message, cb = (err,data) => {}){
    return new Promise((res, rej) => {
        if (ms > 9000) {
            const err = new Error('It is too long');
            rej(err);
            return cb(err, null)
        }
        setTimeout(() => {
            res(message);
            return cb(null, message);
        }, ms)
    })
}

delay(300, 'Hello')
    .then((data) => {
        console.log(data);
        return delay(200, 'How are you');
    })
    .then((data) => {
        console.log(data);
        return delay(900, 'Dieeeeee');
    }).then((data) => {
        console.log(data);
        return delay(100, 'message');
    }).catch((err) => {
        console.log('Error appears');
    }).then((data) => {
        console.log(data);
    });

    Promise.all([
        delay(300, 'USER'),
        delay(200, 'WEATHER')])
        .then( data => {
            const msg = data.join('_');
            return delay(400, msg);
        })
        .then( data => {
            console.log(data + "--moon");
        })

Promise.race([
    delay(300, 'USER'),
    delay(200, 'WEATHER'),
    delay(200, 'BEAR'),
    delay(10, 'UNICORN')])
    .then(data => {
        console.log(data);
})

Promise.reject('ee')
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })



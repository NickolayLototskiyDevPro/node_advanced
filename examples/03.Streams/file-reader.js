const fs = require('fs');

const stream = fs.createReadStream('temp.txt');

const streamWrite = fs.createWriteStream('copy.txt');

const chunkStorage = [];

stream.pipe(streamWrite, {
    end: false
});


streamWrite.on('write', ())
/*stream.on('data', (data) => {
    if(data){
        const str = `${data.toString('utf8')} JoyCasino.com \n`
        chunkStorage.push(data.toString('utf8'));
        streamWrite.write(str, () => {
            console.log('Chunk wrote');
        })
    }
})

stream.on('end', ()=> {
    streamWrite.end('Lev Nikolaevich the best.');
    console.log('This is the end');
});*/
const client = require('net').Socket();


client.on('data', (data) => {
    console.log(data.toString());
    setTimeout(() => {
        let message = rundomMessage();
        client.write(message);
        console.log(`Me: ${message}`);
    }, Math.floor(Math.random() * (7000 - 3000) + 3000));
});

client.on('connect', () => {
    let message = rundomMessage();
    client.write(message);
    console.log(`Me: ${message}`);
})

function rundomMessage(){
    return Math.random().toString(36).substring(7);
}

client.connect(8000);
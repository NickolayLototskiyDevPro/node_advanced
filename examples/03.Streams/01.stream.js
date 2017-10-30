process.stdin.resume();
process.stdin.setEncoding('utf8');

let result = [];

process.stdin.on('data', chunk => {
  console.log('Nick chunk: ', chunk);
  result.push(chunk);
});

process.stdin.on('end', () => {
  console.log(result.join(''));
  console.log('--- END ---');
});

const interval = setInterval(() => {
  console.log('Waiting...')
}, 1000);

setTimeout(() => {
  console.log(process.stdin.eventNames());
  process.stdin.pause();
  console.log(process.stdin.isPaused)
  console.log(process.stdin.eventNames());
  clearInterval(interval);

}, 5000);


/*
//process.stdin.resume();

for (let i = 10; i > 0; i -= 1){
  process.stdout.write(`${i} \n`);
}
process.stdout.on('write', () => {
  console.log('--- START ---');
})

console.log(process.stdout.eventNames());
//process.stdout.emit('finish');*/

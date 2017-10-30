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
  process.stdin.emit('end');
  clearInterval(interval);

}, 5000);
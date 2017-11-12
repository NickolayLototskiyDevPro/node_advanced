const client = require('net').Socket();
const PORT = process.env.PORT || 8080

const questions = [
  'What was the last funny video you saw?',
  'Do you have any pets? What are their names?',
  'If you could be anywhere right now, where would it be?',
  'What would you describe as the happiest moment of your life?',
  'If you could change the world, what would the first thing be?',
  'Where did you go last weekend? What did you do?'
]

client.on('data', data => {
  const question = questions[ Math.floor(Math.random() * questions.length) ]
  const time = Math.floor(Math.random() * (7000 - 3000) + 3000)

  setTimeout(() => {
     client.write(question)
  }, time)
});

 client.on('connect', () => {
   const question = questions[ Math.floor(Math.random() * questions.length) ]
   client.write(question)
 })

 client.connect(PORT)

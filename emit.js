const Ev = require('events')
const ev = new Ev()
ev.on('sec', function() {
  console.log('2')
})

ev.emit('one');
ev.on('one', function() {
  ev.emit('sec')
  console.log('one')
})

ev.emit('one');
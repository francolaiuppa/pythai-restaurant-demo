var Rabbit = require('./lib/rabbit');
var rabbit = new Rabbit();

rabbit.createConnection()
  .then(rabbit.createExchange)
  .then(rabbit.bindToQueue)
  .then(rabbit.subscribeToQueue);

process.on('uncaughtException', function(err) {
  console.error(err);
  console.log('uncaughtException handler');
  console.log('uncaughtExceptionHandler data: ',{ debug: err });
  process.exit(1);
});

const AMQP_EXCHANGE = 'pythai';
const amqpDsn = { url: 'amqp://guest:guest@rabbit:5672' };
const amqpOptions = {
  defaultExchangeName: AMQP_EXCHANGE,
  autoDelete: false
};

var amqp = require('amqp');
var q = require('q');

function RabbitHandler() {
  if (!(this instanceof RabbitHandler)) {
    return new RabbitHandler();
  }
}

RabbitHandler.prototype.createConnection = function() {
  var deferred = q.defer();
  var connection = amqp.createConnection(amqpDsn,amqpOptions);
  connection.on('ready',function() {
    deferred.resolve(connection);
  });
  return deferred.promise;
};

RabbitHandler.prototype.createExchange = function(connection) {
  var deferred = q.defer();
  var exchange = connection.exchange(AMQP_EXCHANGE, {
    type: 'topic',
    durable: true,
    autoDelete: false
  });
  exchange.on('open',function() {
    deferred.resolve(connection);
  });
  return deferred.promise;
};

RabbitHandler.prototype.bindToQueue = function(connection) {
  var deferred = q.defer();
  connection.queue('dishes', function(queue) {
    queue.bind(AMQP_EXCHANGE,'dish.#');
    deferred.resolve(queue);
  });
  return deferred.promise;
};

RabbitHandler.prototype.parseIncomingMessage = function(msg,h,d,msgObj) {
  switch (msgObj.routingKey) {
    case 'dish.dirty': {
      console.log(new Date().toString() + ': Received dirty dish');
      var ack = function() {
        console.log(new Date().toString() + ': Cleaned dish');
        msgObj.acknowledge();
      };
      setTimeout(ack,5000);
      break;
    }
  }
};

RabbitHandler.prototype.subscribeToQueue = function(queue) {
  queue.subscribe({ ack: true}, RabbitHandler.prototype.parseIncomingMessage);
  return q.resolve(queue);
};

module.exports = RabbitHandler;

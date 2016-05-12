# PyThai Restaurant Demo
This is a demo on how to scale an AMQP NodeJS Microservice Architecture
using Docker + Docker Compose, made for the PyThai Meetup.

It consists of 2 AMQP brokers:

- Dirty Dish Generator
- Dishwasher

The idea behind this is that we have a higher frequency of dirty dishes (one
every 2s) than what we can handle with our dishwashers (one every 5s),
so dirty dishes will start to pile up... and we don't want that!

Enter horizontal scaling made easy by docker-compose:

`docker-compose scale dishwasher=10`

After running this command, we'll magically handle more dirty dishes!
Simple as that!

## How to run this?
Install docker (1.10+) and docker-compose (1.6+), then run
`docker-compose up`

## How to test it?
1. Give it a minute so dishes can pile up.
2. Access RabbitMQ administration interface: http://localhost:15672

> Note: if you're using Mac or Windows, please replace localhost with
> your Docker IP.

You can also navigate to `Queues -> Dishes` to view a graph of Queued messages.

3. Scale using the command

`docker-compose scale dishwasher=10`

4. Watch the Dishes get washed!

## More info
Please see the whole presentation at: http://slides.com/francolaiuppa/scaling-a-microservices-architecture-using-docker-and-compose/fullscreen .

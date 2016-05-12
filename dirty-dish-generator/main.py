#!/usr/bin/env python
import pika
from threading import Timer

SEND_MESSAGES_EVERY = 2.0

def resendMessage():
    channel.basic_publish(exchange='pythai',
                          routing_key='dish.dirty',
                          body='')
    print(" [x] Generated dirty dish")
    Timer(SEND_MESSAGES_EVERY, resendMessage).start()

parameters = pika.URLParameters('amqp://guest:guest@rabbit:5672/%2F')
connection = pika.BlockingConnection(parameters)
channel = connection.channel()
Timer(SEND_MESSAGES_EVERY, resendMessage).start()

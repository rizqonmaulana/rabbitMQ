const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err0, connection) {
    if(err0){
        throw err0
    }

    connection.createChannel(function(err1, ch) {
        if(err1){
            throw err1
        }

        const q = 'task_queue';

        ch.assertQueue(q, {
            durable: true
        });
        ch.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        ch.consume(q, function(msg) {
            const secs = msg.content.toString().split('.').length - 1;

            console.log(` [x] Received ${msg.content.toString()}`);
            setTimeout(function() {
                console.log(" [x] Done");
                ch.ack(msg);
            }, secs * 1000);
        }, {
            noAck: false
        });
    });
});
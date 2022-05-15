const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err0, connection) {
    if(err0){
        throw err0
    }

    connection.createChannel(function(err1, ch) {
        if(err1){
            throw err1
        }

        const q = 'hello';

        ch.assertQueue(q, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        
        ch.consume(q, function(msg) {
            console.log(` [x] Received ${msg.content.toString()}`);
        }, {
            noAck: true
        });
        
    });
    // setTimeout(function() {
    //     connection.close();
    //     process.exit(0);
    // }, 500)
});

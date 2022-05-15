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
        const msg = 'Hello World!';

        ch.assertQueue(q, {
            durable: false
        });
        
        ch.sendToQueue(q, Buffer.from(msg))

        console.log(` [x] Sent ${msg}`);
    });
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500)
});
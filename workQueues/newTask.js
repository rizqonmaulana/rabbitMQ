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
            const msg = process.argv.slice(2).join(' ') || 'Hello World!......';

            ch.assertQueue(q, {
                durable: true
            });

            ch.sendToQueue(q, Buffer.from(msg), {
                persistent: true
            })

            console.log(` [x] Sent ${msg}`);
        });

        setTimeout(function() {
            connection.close();
            process.exit(0);
        }
        , 500)
});
        
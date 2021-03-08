const amqp = require('amqplib/callback_api');
const db = require('../models');

const CONN_URL = process.env.RABBITMQ_URL || 'amqp://localhost';

amqp.connect(CONN_URL, function (err, conn) {
  conn.createChannel(function (err, ch) {
    if (err) {
      return;
    }

    const exchange = 'stock';

    ch.assertExchange(exchange, 'direct', {
      durable: true,
    });

    ch.assertQueue(
      '',
      {
        exclusive: false,
      },
      function (error, queue) {
        if (error) {
          return;
        }

        ch.bindQueue(queue.queue, 'stock', 'incremented');
        ch.bindQueue(queue.queue, 'stock', 'decremented');

        ch.consume(queue.queue, async function (msg) {
          const operationMsg =
            msg.fields.routingKey === 'incremented'
              ? 'Incrementar'
              : 'Decrementar';
          const productName = String.fromCharCode(
            ...msg.content.slice(1, msg.content.length - 1)
          );
          const { Product } = db;
          const productToUpdate = await Product.findOne({
            where: {
              name: productName,
            },
          });

          if (productToUpdate) {
            let quantity = 0;

            if (operationMsg === 'Incrementar') {
              quantity += 1;
            } else {
              quantity =
                productToUpdate.dataValues.quantity > 0
                  ? productToUpdate.dataValues.quantity - 1
                  : 0;
            }

            await productToUpdate.update({
              quantity,
            });

            console.log(`${operationMsg}do ${productName}`);
          } else console.log(msg.content.toString(), ' não encontrado na base de dados.');
        });
      },
      {
        noAck: false,
      }
    );
  });
});

import { AmqpConnection, RabbitSubscribe, SubscribeResponse, Nack } from "@golevelup/nestjs-rabbitmq";
import { Injectable } from "@nestjs/common";
import { IMessageBrokerProvider } from "../../IMessageBrokerProvider";

@Injectable()
class RabbitMQProvider implements IMessageBrokerProvider {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  async publishToQueue({ settings, payload }): Promise<void> {
    const { exchange, routingKey } = settings;

    await this.amqpConnection.publish(exchange, routingKey, payload);
  }

  consumeFromQueue(queue: string, callback: (message: any) => Promise<void> | void): void {
    this.amqpConnection.createSubscriber(
      async (msg): Promise<SubscribeResponse | void> => {
        try {
          await callback(msg);
        } catch (error) {
          return new Nack();
        }
      },
      { queue },
      'genericConsumer'
    );
  }
}

export { RabbitMQProvider };
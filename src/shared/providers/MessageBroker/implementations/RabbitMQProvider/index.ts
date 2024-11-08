import { AmqpConnection, SubscribeResponse, Nack } from "@golevelup/nestjs-rabbitmq";
import { Injectable } from "@nestjs/common";
import { IMessageBrokerProvider } from "../../IMessageBrokerProvider";
import { ConfigService } from "@nestjs/config";

@Injectable()
class RabbitMQProvider implements IMessageBrokerProvider {
  constructor(private readonly amqpConnection: AmqpConnection, private readonly configService: ConfigService) { }

  async publishToQueue({ queue, payload }): Promise<void> {
    const exchange = this.configService.get('RABBITMQ_DEFAULT_EXCHANGE');

    const routingKey = queue;

    await this.amqpConnection.publish(exchange, routingKey, payload);
  }

  consumeFromQueue(queue: string, callback: (message: any) => Promise<void> | void): void {
    this.amqpConnection.createSubscriber(
      async (msg): Promise<SubscribeResponse | void> => {
        try {
          await callback(msg);
        } catch (error) {
          console.error(error);
          return new Nack();
        }
      },
      { queue },
      'genericConsumer'
    );
  }
}

export { RabbitMQProvider };
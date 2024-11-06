import { Inject, Logger } from "@nestjs/common";
import { WhatsAppNotificationDTO } from "src/shared/dtos/WhatsAppNotificationDTO";
import { IMessageBrokerProvider } from "src/shared/providers/MessageBroker/IMessageBrokerProvider";

class WhatsAppNotificationService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(@Inject('IMessageBrokerProvider') private readonly messageBrokerProvider: IMessageBrokerProvider) { }

  async onModuleInit() {
    // Consumers
    this.messageBrokerProvider.consumeFromQueue('notification.whatsapp', this.whatsAppNotificationConsumer.bind(this));
  }

  async send(payload: WhatsAppNotificationDTO) {
    const settings = {
      exchange: 'amq.direct',
      routingKey: 'notification.whatsapp',
    };

    await this.messageBrokerProvider.publishToQueue({ settings, payload });
  }

  async whatsAppNotificationConsumer(message: any) {
    try {
      this.logger.log(`Nova mensagem de notificação recebida: ${JSON.stringify(message)}`);

      // Send notification
      this.logger.log(`Enviando notificação via WhatsApp para ${message.phoneNumber}... 📲`);

      // Send notification
      this.logger.log(`Notificação enviada com sucesso para ${message.phoneNumber}! 🎉`);
    } catch (error) {
      this.logger.error('Erro ao processar mensagem de notificação:', error.message);
    }
  }
}

export { WhatsAppNotificationService };
import { Inject, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EmailNotificationDTO } from "src/shared/dtos/EmailNotificationDTO";
import { WhatsAppNotificationDTO } from "src/shared/dtos/WhatsAppNotificationDTO";
import { NotificationRoutingKeyEnum } from "src/shared/enums/notification.enum";
import { IMessageBrokerProvider } from "src/shared/providers/MessageBroker/IMessageBrokerProvider";

class NotificationsService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(@Inject('IMessageBrokerProvider') private readonly messageBrokerProvider: IMessageBrokerProvider, private readonly configService: ConfigService) { }

  async onModuleInit() {
    // Consumers
    // this.messageBrokerProvider.consumeFromQueue('notification.whatsapp', this.whatsAppNotificationConsumer.bind(this));
    // this.messageBrokerProvider.consumeFromQueue('notification.email', this.emailNotificationConsumer.bind(this));
  }

  // async whatsAppNotificationConsumer(message: any) {
  //   try {
  //     this.logger.log(`Nova mensagem de notificação recebida: ${JSON.stringify(message)}`);

  //     this.logger.log(`Enviando notificação via WhatsApp para ${message.phoneNumber}... 📲`);

  //     this.logger.log(`Notificação enviada com sucesso para ${message.phoneNumber}! 🎉`);
  //   } catch (error) {
  //     this.logger.error('Erro ao processar mensagem de notificação:', error.message);
  //   }
  // }

  // async emailNotificationConsumer(message: any) {
  //   try {
  //     this.logger.log(`Nova mensagem de notificação recebida: ${JSON.stringify(message)}`);

  //     this.logger.log(`Enviando notificação via email para ${message.email}... 📧`);

  //     this.logger.log(`Notificação enviada com sucesso para ${message.email}! 🎉`);
  //   } catch (error) {
  //     this.logger.error('Erro ao processar mensagem de notificação:', error.message);
  //   }
  // }

  async sendWhatsApp(payload: WhatsAppNotificationDTO) {

    const queue = this.configService.get('NOTIFICATION_WHATSAPP_QUEUE');

    await this.messageBrokerProvider.publishToQueue({ queue, payload });
  }

  async sendEmail(payload: EmailNotificationDTO) {

    const queue = this.configService.get('NOTIFICATION_EMAIL_QUEUE');

    await this.messageBrokerProvider.publishToQueue({ queue, payload });
  }
}

export { NotificationsService };
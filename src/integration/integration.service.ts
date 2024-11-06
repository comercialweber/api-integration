import { Injectable, Inject, Logger } from '@nestjs/common';
import { IIdProvider } from 'src/shared/providers/IdProvider/IIdProvider';
import { IMessageBrokerProvider } from 'src/shared/providers/MessageBroker/IMessageBrokerProvider';
import { WhatsAppNotificationService } from 'src/shared/services/WhatsAppNotification/whatsapp-notification.service';

let integration = {
  isRunning: false
};

@Injectable()
export class IntegrationService {

  private readonly logger = new Logger(this.constructor.name);

  constructor(@Inject('IdProvider') private readonly idProvider: IIdProvider, @Inject('IMessageBrokerProvider') private readonly messageBrokerProvider: IMessageBrokerProvider, private readonly whatsappNotificationService: WhatsAppNotificationService) { }

  async onModuleInit() {
    // Consumers
    this.messageBrokerProvider.consumeFromQueue('integration.export', this.newExportConsumer.bind(this));
  }

  async handleNewExport() {
    try {

      await this.whatsappNotificationService.send({
        message: `Nova exportação do sistema! 🆕`,
        phoneNumber: '5547992384499'
      });

      const settings = {
        exchange: 'amq.direct',
        routingKey: 'integration.export',
      };

      const payload = {
        id: this.idProvider.generate(),
        timestamp: new Date().toISOString(),
      };

      await this.whatsappNotificationService.send({
        message: `Atualização indo para fila de execução! Aguarde... 🕒`,
        phoneNumber: '5547992384499'
      });

      await this.messageBrokerProvider.publishToQueue({ settings, payload });



      this.logger.log(`Mensagem para nova exportação enviada com sucesso! Payload: ${JSON.stringify(payload)}`);



      return {
        message: 'Nova exportação criada com sucesso!',
        ...payload
      }
    } catch (error) {
      this.logger.error('Erro ao enviar mensagem de exportação:', error.message);

      throw error;
    }
  }

  async newExportConsumer(message) {

    this.logger.log('Iniciando exportação...', message);

    integration.isRunning = true;

    await this.whatsappNotificationService.send({
      message: `Atualização foi iniciada! 🔄`,
      phoneNumber: '5547992384499'
    });

    this.logger.log('Exportação iniciada com sucesso!');

    setTimeout(async () => {

      integration.isRunning = false;

      await this.whatsappNotificationService.send({
        message: `Atualização foi concluída com sucesso! ✅`,
        phoneNumber: '5547992384499'
      });

      this.logger.log('Exportação finalizada com sucesso!');
    }, 10000);
  }
}

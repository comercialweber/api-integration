import { Injectable, Inject, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { timestamp } from 'rxjs';
import { IIdProvider } from 'src/shared/providers/IdProvider/IIdProvider';
import { IMessageBrokerProvider } from 'src/shared/providers/MessageBroker/IMessageBrokerProvider';
import { NotificationsService } from 'src/shared/services/notifications/notifications.service';

let integration = {
  isRunning: false
};

@Injectable()
export class IntegrationService {

  private readonly logger = new Logger(this.constructor.name);

  constructor(@Inject('IdProvider') private readonly idProvider: IIdProvider, @Inject('IMessageBrokerProvider') private readonly messageBrokerProvider: IMessageBrokerProvider, private readonly notificationsService: NotificationsService, private readonly configService: ConfigService) { }

  async onModuleInit() {
    // Consumers
    // this.messageBrokerProvider.consumeFromQueue('integration.export', this.newExportConsumer.bind(this));
  }

  async handleNewExport() {

    let payload = {
      id: null,
      timestamp: null
    }

    const phoneNumber = this.configService.get('WHATSAPP_PHONE_NUMBER')

    try {

      Object.assign(payload, {
        id: this.idProvider.generate(),
        timestamp: new Date().toISOString()
      });

      this.logger.log(`Nova exportação de dados do sistema foi sinalizada! 📦 Ref.: id: ${payload.id} | timestamp: ${payload.timestamp}`);

      await this.notificationsService.sendWhatsApp({
        message: `Nova exportação de dados do sistema foi sinalizada! 📦 Ref.: id: ${payload.id} | timestamp: ${payload.timestamp}.`,
        phoneNumber
      });

      const queue = this.configService.get('INTEGRATION_EXPORT_QUEUE')

      await this.messageBrokerProvider.publishToQueue({ queue, payload });

      this.logger.log(`Integração de dados exportados na fila de execução! Ref.: id: ${payload.id} | timestamp: ${payload.timestamp}`);

      await this.notificationsService.sendWhatsApp({
        message: `Integração de dados exportados na fila de execução! Ref.: id: ${payload.id} | timestamp: ${payload.timestamp}.`,
        phoneNumber
      });

      return {
        ...payload
      }
    } catch (error) {
      this.logger.error(`Houve um erro na integração de dados exportados! Ref.: id: ${payload.id} | timestamp: ${payload.timestamp}.`, error.message);

      await this.notificationsService.sendWhatsApp({
        message: `Houve um erro na integração de dados exportados! Ref.: id: ${payload.id} | timestamp: ${payload.timestamp}.`,
        phoneNumber
      });

      throw error;
    }
  }

  // async newExportConsumer(message) {

  //   this.logger.log('Iniciando exportação...', JSON.stringify(message));

  //   integration.isRunning = true;

  //   await this.notificationsService.sendWhatsApp({
  //     message: `Atualização foi iniciada! 🔄`,
  //     phoneNumber: '5547992384499'
  //   });

  //   this.logger.log('Exportação iniciada com sucesso!');

  //   setTimeout(async () => {

  //     integration.isRunning = false;

  //     await this.notificationsService.sendWhatsApp({
  //       message: `Atualização foi concluída com sucesso! ✅`,
  //       phoneNumber: '5547992384499'
  //     });

  //     this.logger.log('Exportação finalizada com sucesso!');
  //   }, 10000);
  // }
}

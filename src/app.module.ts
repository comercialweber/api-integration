import { Module } from '@nestjs/common';
import { IntegrationModule } from './integration/integration.module';
import { ConfigModule } from '@nestjs/config';
import { IdModule } from './shared/providers/IdProvider/id.module';
import { MessageBrokerModule } from './shared/providers/MessageBroker/message-broker.module';
import { WhatsAppNotificationModule } from './shared/services/WhatsAppNotification/whatsapp-notification.module';
// import { validateEnv } from './config/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    IdModule,
    IntegrationModule,
    WhatsAppNotificationModule,
    MessageBrokerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }


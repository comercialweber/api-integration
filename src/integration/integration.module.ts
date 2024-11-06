import { IntegrationService } from './integration.service';
import { Module } from '@nestjs/common';
import { MessageBrokerModule } from 'src/shared/providers/MessageBroker/message-broker.module';
import { IntegrationController } from './integration.controller';
import { IdModule } from 'src/shared/providers/IdProvider/id.module';

@Module({
  imports: [
  ],
  controllers: [IntegrationController],
  providers: [IntegrationService]
})
export class IntegrationModule { }

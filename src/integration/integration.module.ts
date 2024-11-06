import { IntegrationService } from './integration.service';
import { Module } from '@nestjs/common';
import { IntegrationController } from './integration.controller';

@Module({
  controllers: [IntegrationController],
  providers: [IntegrationService]
})
export class IntegrationModule { }

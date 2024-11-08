import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { IntegrationService } from './integration.service';

@ApiTags('Integration')
@Controller('integration')
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) { }

  @Get('/export/webhooks/e5707e56-4be9-4e9a-959a-99756c1693ed')
  @ApiOperation({ summary: 'Publica mensagem para iniciar nova exportação' })
  async handleNewExport() {
    const response = await this.integrationService.handleNewExport();

    return response;
  }
}

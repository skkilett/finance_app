import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { WebhookService } from './webhook.service';

@Controller('webhook')
@ApiTags('Webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  @ApiOperation({ summary: 'Send data via webhook' })
  @ApiOkResponse({ description: 'OK Response' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async sendWebhookData(@Body() data: any): Promise<void> {
    return await this.webhookService.sendWebhookData(data);
  }
}

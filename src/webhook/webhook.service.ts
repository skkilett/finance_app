import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class WebhookService {
  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {}

  async sendWebhookData(data: any): Promise<any> {
    const url = this.config.get<string>('CREATE_TRANSACTION_URL');
    const payload = {
      data,
    };
    const config: AxiosRequestConfig<any> = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await firstValueFrom(
      this.httpService.post(url, payload, config).pipe(
        catchError((error: AxiosError) => {
          throw `An error happened: ${error}`;
        }),
      ),
    );
    return response.data;
  }
}

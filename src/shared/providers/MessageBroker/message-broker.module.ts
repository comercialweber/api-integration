import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQProvider } from './implementations/RabbitMQProvider';
import { env } from 'src/config/env';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(), // Garante o carregamento das variáveis de ambiente
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      useFactory: () => ({
        uri: env.RABBITMQ_URI,
      }),
      inject: []
    }),

  ],
  providers: [
    {
      provide: 'IMessageBrokerProvider',
      useClass: RabbitMQProvider,
    },
  ],
  exports: ['IMessageBrokerProvider'],
})
export class MessageBrokerModule { }
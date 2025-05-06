import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { EventBusService } from './event-bus.service'

@Module({
  imports: [
    ConfigModule, // make sure ConfigService is available
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          const clientId = configService.get<string>('KAFKA_CLIENT_ID')
          if (!clientId) {
            throw new Error('KAFKA_CLIENT_ID is required')
          }

          const brokers = configService.get<string>('KAFKA_BROKERS')?.split(',')

          if (!brokers) {
            throw new Error('KAFKA_BROKERS is required')
          }
          const groupId = configService.get<string>('KAFKA_GROUP_ID')

          if (!groupId) {
            throw new Error('KAFKA_GROUP_ID is required')
          }

          return {
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId,
                brokers,
              },
              consumer: {
                groupId,
              },
            },
          }
        },
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [EventBusService],
  exports: [],
})
export class EventBusModule {}

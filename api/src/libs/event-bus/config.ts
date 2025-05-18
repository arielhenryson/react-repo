/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* istanbul ignore next */
import { ConfigModule, ConfigService } from '@nestjs/config'

/* istanbul ignore next */
export const queueConfig = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    return {
      defaultJobOptions: {
        // removeOnComplete: true,
      },
      connection: {
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
      },
    }
  },
  inject: [ConfigService],
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Module } from '@nestjs/common'
import { FileStorageService } from './file-storage.service'
import { S3Module } from 'nestjs-s3'
import { ConfigService } from '@nestjs/config'
@Module({
  imports: [
    S3Module.forRootAsync({
      inject: [ConfigService],
      // @ts-expect-error
      useFactory: (configService: ConfigService) => ({
        config: {
          credentials: {
            accessKeyId: configService.get<string>('S3_ACCESS_KEY'),
            secretAccessKey: configService.get<string>('S3_SECRET_KEY'),
          },
          region: 'us-east-1',
          endpoint: configService.get<string>('S3_ENDPOINT'),
          forcePathStyle: true,
          signatureVersion: 'v4',
        },
      }),
    }),
  ],
  providers: [FileStorageService],
  exports: [FileStorageService],
})
export class FileStorageModule {}

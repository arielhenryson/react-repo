import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DBModule } from './libs/db/db.module'
import { ConfigModule } from '@nestjs/config'
import { validationSchema } from './libs/db/config/config.validation'
import { AuthModule } from './libs/auth/auth.module'
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: __dirname + '/../../.env',
      isGlobal: true,
      validationSchema: validationSchema(),
    }),
    AuthModule,
    DBModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

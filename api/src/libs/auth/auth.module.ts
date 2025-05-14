import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'

import { CustomStrategy } from './custom.strategy'

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'custom',
    }),
  ],
  providers: [CustomStrategy],
  exports: [PassportModule],
})
export class AuthModule {}

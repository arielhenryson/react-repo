import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'

import { CustomStrategy } from './custom.strategy'

@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    PassportModule.register({
      defaultStrategy: 'custom',
    }),
  ],
  providers: [CustomStrategy],
  exports: [PassportModule],
})
export class AuthModule {}

import { Module } from '@nestjs/common'
import { VectorStorageService } from './vector-storage.service'

@Module({
  imports: [],
  providers: [VectorStorageService],
  exports: [VectorStorageService],
})
export class VectorStorageModule {}

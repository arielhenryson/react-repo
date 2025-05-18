import { Controller, Get, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { AuthGuard } from '@nestjs/passport'
import { TestQueueProducers } from './libs/event-bus/services/test-queue.producers'
import { FileStorageService } from './libs/file-storage/file-storage.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly testQueueProducers: TestQueueProducers,
    private readonly fileStorageService: FileStorageService,
  ) {
    void this.testQueue()
    void this.fileStorageService.uploadFile()
  }

  async testQueue() {
    await this.testQueueProducers.add({ message: 'Hello World!' })
  }

  @UseGuards(AuthGuard())
  @Get('config')
  getConfig() {
    return { message: 'Hello World!' }
  }
}

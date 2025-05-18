import { Injectable } from '@nestjs/common'
import { Queue } from 'bullmq'
import { InjectQueue } from '@nestjs/bullmq'
import { QueueNames } from '../types'

@Injectable()
export class TestQueueProducers {
  constructor(@InjectQueue(QueueNames.TEST_QUEUE) private testQueue: Queue) {}

  async add(data: any) {
    return await this.testQueue.add('test-process', data)
  }
}

import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Job } from 'bullmq'
import { QueueNames } from '../types'

@Processor(QueueNames.TEST_QUEUE)
export class TestQueueConsumer extends WorkerHost {
  // eslint-disable-next-line @typescript-eslint/require-await
  async process(job: Job<any, any, string>): Promise<any> {
    console.log('should process job ', job.data)
  }
}

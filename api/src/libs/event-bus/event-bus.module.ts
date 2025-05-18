import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { BullModule } from '@nestjs/bullmq'
import { queueConfig } from './config'
import { TestQueueProducers } from './services/test-queue.producers'
import { QueueNames } from './types'
import { BullBoardModule } from '@bull-board/nestjs'
import { ExpressAdapter } from '@bull-board/express'
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'
import { TestQueueConsumer } from './services/test-queue.consumer'

const dashboardURI = 'queues-dash' + Math.random().toString(36).substring(7)

console.log('bull board dashboard uri', dashboardURI)

@Module({
  imports: [
    ConfigModule,
    BullModule.forRootAsync(queueConfig),
    BullModule.registerQueue({
      name: QueueNames.TEST_QUEUE,
    }),
    BullBoardModule.forFeature({
      name: QueueNames.TEST_QUEUE,
      adapter: BullMQAdapter,
    }),

    // dashboard for debug
    BullBoardModule.forRoot({
      // create route with random uid
      route: dashboardURI,
      adapter: ExpressAdapter,
    }),
  ],
  providers: [TestQueueProducers, TestQueueConsumer],
  exports: [TestQueueProducers],
})
export class EventBusModule {}

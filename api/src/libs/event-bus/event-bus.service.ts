import { Injectable, OnModuleInit } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { Inject } from '@nestjs/common'

@Injectable()
export class EventBusService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await new Promise((res) => setTimeout(res, 3000)) // wait 3 seconds

    // Trigger internal Kafka connection setup
    await this.kafkaClient.connect()
    console.log('✅ Connected to Kafka successfully')
  }
}

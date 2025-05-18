import { Injectable } from '@nestjs/common'
import { InjectS3, S3 } from 'nestjs-s3'
import { PutObjectCommand } from '@aws-sdk/client-s3'

@Injectable()
export class FileStorageService {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  constructor(@InjectS3() private readonly s3: S3) {}

  async uploadFile() {
    console.log('testing upload file')
    const bucketName = 'test-bucket'
    const fileName = 'test-file.txt'
    const fileContent = 'This is a test file uploaded from NestJS'

    // Convert string content to a readable stream

    const putObjectCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,

      Body: fileContent,
      ContentType: 'text/plain',
      Metadata: {
        test: 'test',
      },
    })

    try {
      await this.s3.send(putObjectCommand)
    } catch (error) {
      console.error('S3 Upload Error:', error)
      throw error
    }
  }
}

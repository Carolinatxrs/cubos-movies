import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from 'node:crypto';

interface UploadParams {
  filename: string;
  fileType: string;
  body: Buffer;
}

@Injectable()
export class StorageService {
  private client: S3Client;

  constructor(private configService: ConfigService) {
    this.client = new S3Client({
      region: 'auto',
      endpoint: this.configService.get<string>('aws.endpoint'),
      forcePathStyle: true,
      credentials: {
        accessKeyId: this.configService.get<string>('aws.accessKeyId'),
        secretAccessKey: this.configService.get<string>('aws.secretAccessKey'),
      },
    });
  }

  async upload({ filename, body, fileType }: UploadParams): Promise<{ url: string }> {
    const uploadId = randomUUID();
    const uniqueFilename = `${uploadId}-${filename}`;

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.configService.get<string>('aws.bucket'),
        Key: uniqueFilename,
        ContentType: fileType,
        Body: body,
      })
    )

    return { url: uniqueFilename };
  }

  async generateUrl (key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.configService.get<string>('aws.bucket'),
      Key: key,
    });

    const url = await getSignedUrl(this.client, command, { expiresIn: 3600 });
    return url;
  }
}
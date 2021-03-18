import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { Readable } from 'stream'

import { saveStream } from '~/core/libs/save-stream'
import { Module } from '~/core/modules'

export interface DownloadS3ObjectParams {
  bucket: string
  key: string
  outputPath: string
}

export type DownloadS3ObjectModule = Module<DownloadS3ObjectParams>

export function instantiateDownloadS3ObjectModule(
  s3Client: S3Client
): DownloadS3ObjectModule {
  return {
    async execute({ bucket, key, outputPath }) {
      const command = new GetObjectCommand({
        Bucket: bucket,
        Key: key
      })

      const response = await s3Client.send(command)

      const body: Readable = response.Body

      await saveStream(body, outputPath)
    }
  }
}

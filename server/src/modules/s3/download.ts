import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import fs from 'fs'
import { Readable } from 'stream'

import { Module } from '~/modules'

export interface DownloadS3ObjectsParams {
  inputPath: string
  outputPath: string
}

export type DownloadS3ObjectsModule = Module<DownloadS3ObjectsParams>

export function instantiateDownloadS3ObjectsModule(
  s3Client: S3Client
): DownloadS3ObjectsModule {
  return {
    async execute({ inputPath, outputPath }) {
      const command = new GetObjectCommand({
        Bucket: 'fake-access',
        Key: inputPath
      })

      const response = await s3Client.send(command)

      const body: Readable = response.Body

      const outputFile = fs.createWriteStream(outputPath)

      body.pipe(outputFile)
    }
  }
}

import { S3Client, ListObjectsCommand } from '@aws-sdk/client-s3'

import { Module } from '~/core/modules'

export interface ListS3ObjectsParams {
  bucket: string
  folderPath: string
}

export type ListS3ObjectsModule = Module<ListS3ObjectsParams, string[]>

export function instantiateListS3ObjectsModule(
  s3Client: S3Client
): ListS3ObjectsModule {
  return {
    async execute({ bucket, folderPath }) {
      const command = new ListObjectsCommand({
        Bucket: bucket,
        Prefix: folderPath,
        Delimiter: '/'
      })

      const response = await s3Client.send(command)

      const keys: string[] = []

      response.Contents?.map(({ Key }) => Key && keys.push(Key))

      return keys
    }
  }
}

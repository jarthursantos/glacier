import { GlacierClient } from '@aws-sdk/client-glacier'
import { S3Client } from '@aws-sdk/client-s3'
import { asValue, createContainer } from 'awilix'

import { modulesRegistrations } from '~/modules'
import { servicesRegistrations } from '~/services'
import { utilsRegistrations } from '~/utils'

const container = createContainer({ injectionMode: 'CLASSIC' })

const glacierClient = new GlacierClient({ region: 'sa-east-1' })
const s3Client = new S3Client({ region: 'sa-east-1' })

container.register({
  glacierClient: asValue(glacierClient),
  s3Client: asValue(s3Client),

  ...modulesRegistrations,

  ...servicesRegistrations,

  ...utilsRegistrations
})

export { container }

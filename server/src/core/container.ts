import { GlacierClient } from '@aws-sdk/client-glacier'
import { S3Client } from '@aws-sdk/client-s3'
import { asValue, createContainer } from 'awilix'
import Neo4j from 'neo4j-driver'

import { URL, PASSWORD, USERNAME } from '~/core/configs/neo4j'
import { queueJobsRegistrations } from '~/core/jobs'
import { modulesRegistrations } from '~/core/modules'
import { servicesRegistrations } from '~/core/services'
import { utilsRegistrations } from '~/core/utils'

const container = createContainer({ injectionMode: 'CLASSIC' })

const glacierClient = new GlacierClient({ region: 'sa-east-1' })
const s3Client = new S3Client({ region: 'sa-east-1' })
const neo4jClient = Neo4j.driver(URL, Neo4j.auth.basic(USERNAME, PASSWORD))

container.register({
  glacierClient: asValue(glacierClient),
  s3Client: asValue(s3Client),
  neo4jClient: asValue(neo4jClient),

  ...modulesRegistrations,
  ...queueJobsRegistrations,
  ...servicesRegistrations,
  ...utilsRegistrations
})

export { container }

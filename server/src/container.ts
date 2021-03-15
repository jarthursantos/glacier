import { GlacierClient } from '@aws-sdk/client-glacier'
import { asValue, createContainer } from 'awilix'

import { modulesRegistrations } from '~/modules'
import { servicesRegistrations } from '~/services'
import { utilsRegistrations } from '~/utils'

const container = createContainer({ injectionMode: 'CLASSIC' })

const client = new GlacierClient({ region: 'sa-east-1' })

container.register({
  client: asValue(client),

  ...modulesRegistrations,

  ...servicesRegistrations,

  ...utilsRegistrations
})

export { container }

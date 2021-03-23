import '~/core/configs'

import fs from 'fs'
import { createInterface } from 'readline'

import { container } from '~/core/container'
import { ImportAccessService } from '~/core/services/import/access'

const importAccessService = container.resolve<ImportAccessService>(
  'importAccessService'
)
const fileStream = fs.createReadStream(process.argv[2])

const lines = createInterface({ input: fileStream, crlfDelay: Infinity })

lines.on('line', line => {
  importAccessService
    .execute({
      bucket: 'qualicorp-imagem-meta',
      vaultName: 'main',
      key: line
    })
    .then(result => console.log(result))
    .catch(console.error)
    .finally(() => console.log(line))
})

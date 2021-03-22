import fs from 'fs'
import os from 'os'
import path from 'path'

import { InvalidContractError } from '~/core/errors/contract/InvalidContract'
import { InvalidKeyError } from '~/core/errors/key/InvalidKey'
import { AttachArchiveModule } from '~/core/modules/archives/attach'
import { CreateContractModule } from '~/core/modules/contracts/create'
import { FindContractModule } from '~/core/modules/contracts/find'
import { UploadGlacierArchiveModule } from '~/core/modules/glacier/archives/upload'
import { DownloadS3ObjectModule } from '~/core/modules/s3/download'
import { Service } from '~/core/services'
import { FindGlacierVaultService } from '~/core/services/glacier/vaults/find'

export interface ImportAccessParams {
  key: string
  bucket: string
  vaultName: string
}

export type ImportAccessService = Service<ImportAccessParams>

export function instantiateImportAccessService(
  createContractModule: CreateContractModule,
  findContractModule: FindContractModule,
  findGlacierVaultService: FindGlacierVaultService,
  downloadS3ObjectModule: DownloadS3ObjectModule,
  uploadGlacierArchiveModule: UploadGlacierArchiveModule,
  attachArchiveModule: AttachArchiveModule
): ImportAccessService {
  return {
    async execute({ key, bucket, vaultName }) {
      const filename = extractFilename(key)
      const matricula = extractContract(filename)
      const [ano, mes] = extractDate(key)

      const contractExists = await findContractModule.execute({ matricula })

      const outputPath = path.resolve(os.tmpdir(), filename)

      await downloadS3ObjectModule.execute({ bucket, key, outputPath })
      const vault = await findGlacierVaultService.execute({ vaultName })

      const file = fs.readFileSync(outputPath)

      const {
        archiveId: id_glacier
      } = await uploadGlacierArchiveModule.execute({
        description: filename,
        vault,
        file
      })

      fs.unlinkSync(outputPath)

      if (!contractExists) {
        await createContractModule.execute({ matricula })
      }

      const operadora = extractOperator(matricula)

      await attachArchiveModule.execute({
        archive: { id_glacier, origem: 'Access', operadora, ano, mes },
        contract: { matricula }
      })
    }
  }
}

function extractFilename(path: string): string {
  const [match] = path.match(/[a-zA-Z]{2,4}[0-9]{8,10}.pdf/g) || []

  if (!match) {
    throw new InvalidKeyError(path)
  }

  return match
}

function extractContract(path: string): string {
  const [match] = path.match(/[a-zA-Z]{2,4}[0-9]{8,10}/g) || []

  if (!match) {
    throw new InvalidContractError()
  }

  return match
}

function extractDate(path: string): [number, number] {
  const [match] = path.match(/\d{6}/) || []

  if (!match) {
    throw new InvalidContractError()
  }

  return [parseInt(match.substr(0, 4)), parseInt(match.substr(4, 2))]
}

function extractOperator(filename: string) {
  return filename.replace(/\d/g, '')
}

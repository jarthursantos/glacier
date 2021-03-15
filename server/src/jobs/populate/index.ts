import { Vault } from '~/domain/Vault'
import { Job } from '~/jobs'

export interface PopulateParams {
  vault: Vault
}

const Populate: Job<PopulateParams> = {
  key: 'Populate',
  handler: async ({ vault }) => {
    console.log({ vault })
  }
}

export { Populate }

import { asFunction, NameAndRegistrationPair } from 'awilix'

import { instantiateDateParser } from './date/parse'
import { instantiateExtractJobFromParams } from './params/extract-job'
import { instantiateExtractVaultFromParams } from './params/extract-vault'

export const utilsRegistrations: NameAndRegistrationPair<any> = {
  dateParser: asFunction(instantiateDateParser),
  extractJobFromParams: asFunction(instantiateExtractJobFromParams),
  extractVaultFromParams: asFunction(instantiateExtractVaultFromParams)
}

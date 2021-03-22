import { Request, Response } from 'express'

import { container } from '~/core/container'
import { CreateRetrievalContractService } from '~/core/services/contracts/retrieval'

const createRetrievalContractService = container.resolve<CreateRetrievalContractService>(
  'createRetrievalContractService'
)

export async function handleCreateRetrievalContract(
  request: Request,
  response: Response
) {
  const { contrato, arquivo } = request.params
  const { user } = request.auth

  const job = await createRetrievalContractService.execute({
    archiveId: arquivo,
    userId: user.id,
    contrato
  })

  return response.json(job)
}

import { Request, Response } from 'express'

import { container } from '~/core/container'
import { CreateRetrievalContractService } from '~/core/services/contracts/retrieval'
import { CompleteJobsByUserService } from '~/core/services/jobs/complete-by-user'
import { PendingJobsByUserService } from '~/core/services/jobs/pending-by-user'

const createRetrievalContractService = container.resolve<CreateRetrievalContractService>(
  'createRetrievalContractService'
)
const completeJobsByUserService = container.resolve<CompleteJobsByUserService>(
  'completeJobsByUserService'
)
const pendingJobsByUserService = container.resolve<PendingJobsByUserService>(
  'pendingJobsByUserService'
)

export async function handleCreateRetrievalArchiveJob(
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

export async function handleFindPendingJobs(
  request: Request,
  response: Response
) {
  const { user } = request.auth

  const jobs = await pendingJobsByUserService.execute({ userId: user.id })

  return response.json(
    jobs.map(({ archive, contract, job }) => ({
      arquivo: archive,
      contrato: contract,
      trabalho: job
    }))
  )
}

export async function handleFindCompletedJobs(
  request: Request,
  response: Response
) {
  const { user } = request.auth

  const jobs = await completeJobsByUserService.execute({ userId: user.id })

  return response.json(
    jobs.map(({ archive, contract, job }) => ({
      arquivo: archive,
      contrato: contract,
      trabalho: job
    }))
  )
}

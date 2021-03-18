import { Router } from 'express'

import { handleSearchDocuments } from '~/apps/server/controllers/documents'

const documentsRoutes = Router()

documentsRoutes.get('/search', handleSearchDocuments)

export { documentsRoutes }

import '~/configs'
import '~/container'

import http from 'http'

import { app } from '~/app'
import { createDebuger } from '~/debug'
import { Access, AccessParams } from '~/jobs/access'
import { enqueueJob } from '~/libs/Queue'

const debug = createDebuger('server')
const port = parseInt(process.env.PORT || '3000')

app.set('port', port)
app.disable('x-powered-by')

const server = http.createServer(app)

server.listen(port)

server.on('listening', () => {
  const addr = server.address()
  const bind =
    typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port || ''

  debug('Listening on ' + bind)
})

enqueueJob<AccessParams>(Access.key, {
  fullBucketPath: 'QUALICORP RIO/201903/AFAP00000530/AFAP00000530.pdf'
})

// module.execute({
//   inputPath: 'QUALICORP RIO/201903/AFAP00000530/AFAP00000530.pdf',
//   outputPath
// })

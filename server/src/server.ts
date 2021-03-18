import '~/core/configs'
import '~/core/container'

import http from 'http'

import { app } from '~/apps/server'
import { createDebuger } from '~/utils/debug'

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

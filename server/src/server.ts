import '~/configs'
import '~/container'

import http from 'http'

import { app } from '~/app'
import { createDebuger } from '~/debug'

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

const host = String(process.env.REDIS_HOST)
const port = parseInt(process.env.REDIS_PORT || '6379')

export { host, port }
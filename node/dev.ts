import { createServer } from 'vite'
import { ApiMiddleware } from './middleware'

async function start() {
  const server = await createServer({
    server: {
      open: true,
    },
    plugins: [
      {
        name: 'server',
        configureServer(server) {
          server.middlewares.use('/api/', ApiMiddleware())
        },
      },
    ],
  })

  await server.listen(8113)
}

start()

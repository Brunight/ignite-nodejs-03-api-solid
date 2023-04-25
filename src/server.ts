import { app } from './app'
import { env } from './env'

app.get('/', function (request, response) {
	response.send({ message: 'Hello world!' })
})

app.get('/ping', function (request, response) {
	response.send('pong')
})

app
	.listen({
		port: env.PORT,
		host: '0.0.0.0',
	})
	.then(() => console.log(`🚀 Listening on 'http://localhost:${env.PORT}'!`))

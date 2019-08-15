const path = require('path')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

const PORT = process.env.PORT || 3000

server.use(middlewares)
server.use(jsonServer.bodyParser)

// adding timestamps on POST requests
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  next()
})

// custom middleware for this route
server.use('/items/:id', (req, res, next) => {
  if (req.method === 'DELETE') {
    // Serverjson defaut routes always return an empty object
    // might have to write our own custom route or rewrite the response res.write
    const { id } = req.params
    res.body = {ok: true, id }
  }
  next()
})

// basic server-json routes
server.use(router)

server.listen(PORT, () => {
  console.log(`JSON Server is running is on ${PORT}`)
})
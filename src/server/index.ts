import express, { Express } from 'express'

import ingredientsRouter from './routes/ingredients'

const app: Express = express()

const hostname = 'localhost'
const port = 3000

app.use('/ingredients', ingredientsRouter)

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

import express, { Express } from 'express'

import ingredientsRouter from './routes/ingredients'
import unitsRouter from './routes/units'

const app: Express = express()

const hostname = 'localhost'
const port = 3000

const apiVersion = 'v1'
const basePath = `/api/${apiVersion}`

app.use(`${basePath}/ingredients`, ingredientsRouter)
app.use(`${basePath}/units`, unitsRouter)

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

import express, { Express } from 'express'

import groceriesRouter from './routes/groceries'
import unitsRouter from './routes/units'

const app: Express = express()

const hostname = process.env.HOST ? process.env.HOST : '0.0.0.0'
const port = process.env.PORT ? parseInt(process.env.PORT) : 8080

const apiVersion = 'v1'
const basePath = `/api/${apiVersion}`

app.use(`${basePath}/groceries`, groceriesRouter)
app.use(`${basePath}/units`, unitsRouter)

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

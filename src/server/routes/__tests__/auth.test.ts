import request from 'supertest'
import path from 'path'
import {
  DockerComposeEnvironment,
  StartedDockerComposeEnvironment,
} from 'testcontainers'
import { app } from '../..'

let environment: StartedDockerComposeEnvironment

beforeAll(async () => {
  const composeFilePath = path.resolve('./docker/testing')
  const composeFile = 'docker-compose.yaml'

  environment = await new DockerComposeEnvironment(
    composeFilePath,
    composeFile
  ).up()
})

afterAll(async () => {
  await environment.down()
})

describe('Sample Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true)
  })
})

describe('Auth Endpoints', () => {
  it('should register new user', async () => {
    const res = await request(app)
      .post('/api/v1/register', (err, res) => {
        console.log(err)
        console.log(res)
      })
      .send({ username: 'test', password: 'test' })

    expect(res.statusCode).toEqual(200)
    //expect(res.body).toHaveProperty('id')
  })
})

describe('Unit Endpoints', () => {
  it('should get all units', async () => {
    const res = await request(app).get('/api/v1/units')

    expect(res.statusCode).toEqual(403)
    //expect(res.body).toHaveProperty('id')
  })
})

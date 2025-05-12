import { createHttpsAgent } from './https-agent'

import { Agent } from 'https'

const ca = `-----BEGIN CERTIFICATE-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzv0RA5g2C6eP4rCeKt6x
gjK9zYzFi4KvZ6GpK8SMAxy+Q0JQ95KnShP0aiM1jUM9F2xGb8sAxKKGJ3Dy7E7P
3Z8HR5T9Rq3Z6GpK8SMAxy+Q0JQ95KnShP0aiM1jUM9F2xGb8sAxKKGJ3Dy7E7P3
Z8HR5T9Rq3Z6GpK8SMAxy+Q0JQ95KnShP0aiM1jUM9F2xGb8sAxKKGJ3Dy7E7P3Z
8HR5T9Rq3Z6GpK8SMAxy+Q0JQ95KnShP0aiM1jUM9F2xGb8sAxKKGJ3Dy7E7P3Z8
HR5T9Rq3Z6GpK8SMAxy+Q0JQ95KnShP0aiM1jUM9F2xGb8sAxKKGJ3Dy7E7P3Z8H
R5T9Rq3Z6GpK8SMAxy+Q0JQ95KnShP0aiM1jUM9F2xGb8sAxKKGJ3Dy7E7P3Z8HR
5T9Rq3Z6GpK8SMAxy+Q0JQ95KnShP0aiM1jUM9F2xGb8sAxKKGJ3Dy7E7P3Z8HR5
T9Rq3Z6GpK8SMAxy+Q0JQ95KnShP0aiM1jUM9F2xGb8sAxKKGJ3Dy7E7P3Z8HR5T
9Rq3Z6GpK8SMAxy+Q0JQ95KnShP0aiM1jUM9F
-----END CERTIFICATE-----`

describe('createHttpsAgent', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should create an Agent with default options when ca is not provided', async () => {
    const agent = await createHttpsAgent('')
    expect(agent).toBeInstanceOf(Agent)
    expect(agent.options.ca).toBeUndefined()
  })

  it('should create an Agent with the provided valid PEM string', async () => {
    const agent = await createHttpsAgent(ca)
    expect(agent).toBeInstanceOf(Agent)
    expect(agent.options.ca).toBe(ca)
  })

  it('should create an Agent with the provided PEM file path', async () => {
    const caPath = __dirname + '/' + 'demo.pem'

    const agent = await createHttpsAgent(caPath)
    expect(agent).toBeInstanceOf(Agent)
    expect(agent.options.ca).toBe(ca)
  })

  it('should create an Agent with the provided PEM file path', async () => {
    const invalidCa = __dirname + '/' + 'demo1.pem'

    await expect(createHttpsAgent(invalidCa)).rejects.toThrow(
      'Invalid PEM format',
    )
  })

  it('should throw an error for invalid PEM string', async () => {
    const invalidCa = 'invalid-ca'
    await expect(createHttpsAgent(invalidCa)).rejects.toThrow(
      'Invalid PEM format',
    )
  })

  it('should throw an error for invalid PEM string', async () => {
    const invalidCa = 'invalid-ca'
    await expect(createHttpsAgent(invalidCa)).rejects.toThrow(
      'Invalid PEM format',
    )
  })
})

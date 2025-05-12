import { Agent, AgentOptions } from 'https'
import { promises as fs } from 'fs'

export async function createHttpsAgent(
  caStringOrPemPath: string,
): Promise<Agent> {
  const agentOptions: AgentOptions = {
    rejectUnauthorized: false,
  }
  let caContent = caStringOrPemPath

  if (caStringOrPemPath) {
    const pemRegex =
      /-----BEGIN CERTIFICATE-----[\s\S]+-----END CERTIFICATE-----/
    try {
      const stats = await fs.stat(caStringOrPemPath)
      if (stats.isFile()) {
        caContent = await fs.readFile(caStringOrPemPath, 'utf-8')
      }
    } catch {
      if (!pemRegex.test(caStringOrPemPath)) {
        throw new Error('Invalid PEM format')
      }
    }

    agentOptions.ca = caContent
  }

  return new Agent(agentOptions)
}

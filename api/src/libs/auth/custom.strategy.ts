/* eslint-disable @typescript-eslint/no-floating-promises */

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Strategy } from 'passport-custom'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import * as jwksClient from 'jwks-rsa'
import { createHttpsAgent } from '../https-agent/https-agent'

@Injectable()
export class CustomStrategy extends PassportStrategy(Strategy, 'custom') {
  client: jwksClient.JwksClient

  constructor() {
    super()

    this.createJwksClient()
  }

  async createJwksClient() {
    // @ts-ignore
    const requestAgent = await createHttpsAgent(process.env.EXTRA_CA_CERTS)

    const jwksUri = process.env.JWKS_ADDRESS

    console.log(jwksUri)
    this.client = jwksClient({
      // @ts-ignore
      jwksUri,
      requestAgent,
      cache: true,
      cacheMaxEntries: 100000,
      cacheMaxAge: 60000,
    })
  }

  async validate(req: Request) {
    const authHeader = req.headers['authorization']

    console.log(authHeader)
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing')
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
      throw new UnauthorizedException('Token missing')
    }

    try {
      const decoded: any = await this.validateToken(token)

      console.log(decoded)

      // Return an object that includes the user ID
      return { uid: decoded.sub }
    } catch (e) {
      console.log('Invalid token', e)
      throw new UnauthorizedException('Invalid token')
    }
  }

  async validateToken(token: string) {
    return new Promise((resolve, reject) => {
      /* istanbul ignore next */
      const getKey = (header: any, callback: any) => {
        this.client.getSigningKey(header.kid, (err, key: any) => {
          if (err) {
            return reject(err)
          }
          const signingKey = key.publicKey || key.rsaPublicKey
          callback(null, signingKey)
        })
      }

      jwt.verify(token, getKey, (err, decoded) => {
        if (err) {
          return reject(err)
        }
        resolve(decoded)
      })
    })
  }
}

import { Test, TestingModule } from '@nestjs/testing'
import { UnauthorizedException } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'

import { CustomStrategy } from './custom.strategy'

describe('CustomStrategy', () => {
    let strategy: CustomStrategy

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ CustomStrategy ],
        }).compile()

        strategy = module.get<CustomStrategy>(CustomStrategy)
        strategy.createJwksClient = jest.fn() // Mock the JWKS client creation
    })

    it('should throw UnauthorizedException if authorization header is missing', async () => {
        const req = { headers: {} } as Request

        await expect(strategy.validate(req)).rejects.toThrow(UnauthorizedException)
    })

    it('should throw UnauthorizedException if token is missing', async () => {
        // @ts-ignore
        const req = { headers: { authorization: 'Bearer ' } } as Request

        await expect(strategy.validate(req)).rejects.toThrow(UnauthorizedException)
    })

    it('should throw UnauthorizedException if token is invalid', async () => {
        // @ts-ignore
        const req = { headers: { authorization: 'Bearer invalidToken' } } as Request

        await expect(strategy.validate(req)).rejects.toThrow(UnauthorizedException)
    })

    it('should throw an UnauthorizedException if getSigningKey returns an error', async () => {
        const req: any = { headers: { authorization: 'Bearer validToken' } }

        // Mock jwksClient's getSigningKey to simulate an error
        const getSigningKeyMock = jest.fn((kid, callback) => {
            callback(new Error('Invalid key'), null)
        })

        strategy.client = { getSigningKey: getSigningKeyMock } as any

        await expect(strategy.validate(req)).rejects.toThrow(UnauthorizedException)
    })

    it('should validate and return the decoded user ID when a valid token is provided', async () => {
        const req: any = { headers: { authorization: 'Bearer validToken' } }

        // Mock the JWT verification and resolve with a decoded token
        const decodedToken = { sub: 'user123' }
        jest.spyOn(jwt, 'verify').mockImplementation((token, key, callback) => {
            // @ts-ignore
            callback(null, decodedToken)
        })

        const result = await strategy.validate(req)
        expect(result).toEqual({ uid: 'user123' })
    })
})

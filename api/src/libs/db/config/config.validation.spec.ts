import { validationSchema } from './config.validation'

describe('validationSchema', () => {
    it('should validate all env', () => {
        const schema = validationSchema()
        const envVars = {
            NODE_ENV: 'test',
            MONGODB_URI: 'mongodb://localhost:27017/test',
            JWKS_ADDRESS: 'some url',
            REDIS_HOST: 'localhost',
            REDIS_PORT: 6379,
        }
    
        const res = schema.validate(envVars)

        expect(res.error).toBeUndefined()
    })

    it('should throw an error when NODE_ENV is invalid', () => {
        const schema = validationSchema()
        const envVars = {
            NODE_ENV: 'invalid',
            MONGODB_URI: 'mongodb://localhost:27017/test',
        }

        const res = schema.validate(envVars)

        expect(res.error).not.toBeNull()
    })

    it('should throw an error when MONGODB_URI is missing', () => {
        const schema = validationSchema()
        const envVars = {
            NODE_ENV: 'test',
        }

        const res = schema.validate(envVars)

        expect(res.error).not.toBeNull()
    })
})

import * as Joi from 'joi'

export function validationSchema() {
  return Joi.object({
    // The NODE_ENV environment variable is a special environment variable
    // that is commonly used in Node.js applications to indicate the
    // environment in which the application is running.
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test', 'provision')
      .required(),

    // The MONGODB_URI environment variable is commonly used in Node.js applications
    // that use MongoDB as a database. It is used to store the connection string or
    // URI for the MongoDB database that the application should connect to.
    MONGODB_URI: Joi.string().required(),

    // The REDIS_HOST environment variable is used to store the host name or IP address
    // of the Redis server that the application should connect to.
    REDIS_HOST: Joi.string().required(),

    // The REDIS_PORT environment variable is used to store the port number on which
    // the Redis server is running.
    REDIS_PORT: Joi.number().required(),

    // The JWKS_ADDRESS environment variable is used to store the URL of the
    // JSON Web Key Set (JWKS) endpoint for the authentication server.
    JWKS_ADDRESS: Joi.string().required(),

    // The S3_ACCESS_KEY environment variable is used to store the access key
    // for the S3 server.
    S3_ACCESS_KEY: Joi.string().required(),

    // The S3_SECRET_KEY environment variable is used to store the secret key
    // for the S3 server.
    S3_SECRET_KEY: Joi.string().required(),

    // The S3_ENDPOINT environment variable is used to store the endpoint for the
    // S3 server.
    S3_ENDPOINT: Joi.string().required(),
  })
}

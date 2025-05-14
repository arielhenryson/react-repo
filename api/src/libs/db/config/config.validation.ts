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

    // The KAFKA_CLIENT_ID environment variable is used to identify the client
    // that is connecting to the Kafka cluster. It is used to store the client
    // ID for the Kafka client that the application should connect to.
    KAFKA_CLIENT_ID: Joi.string().required(),

    // The KAFKA_BROKERS environment variable is used to store the list of
    // Kafka brokers that the application should connect to.
    KAFKA_BROKERS: Joi.string().required(),

    // The KAFKA_GROUP_ID environment variable is used to store the group ID
    // for the Kafka consumer that the application should connect to.
    KAFKA_GROUP_ID: Joi.string().required(),

    // The JWKS_ADDRESS environment variable is used to store the URL of the
    // JSON Web Key Set (JWKS) endpoint for the authentication server.
    JWKS_ADDRESS: Joi.string().required(),
  })
}

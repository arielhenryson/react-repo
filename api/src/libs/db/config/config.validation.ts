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
  })
}

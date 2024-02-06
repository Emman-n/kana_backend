// config.js
import 'dotenv/config';


const config = {
    database: {
        host: process.env.DB_HOST || 'default_host',
        username: process.env.DB_USERNAME || 'default_username',
        password: process.env.DB_PASSWORD || 'default_password',
        databaseName: process.env.DB_NAME || 'default_database',
      },
      apiKey: process.env.API_KEY || 'default_api_key',
      port: process.env.PORT  ,  // default to 3000 if PORT is not specified
      // Add other configuration variables as needed
    };
  
  export default config;

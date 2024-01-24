// config.js
import 'dotenv/config';


const config = {
    database: {
      port: process.env.PORT  ,
      host: process.env.DB_HOST  ,
      username: process.env.DB_USER   ,
      password: process.env.DB_PASSWORD  ,
      databaseName: process.env.DB_NAME  
    },
    apiKey: process.env.API_KEY || 'default_api_key',
    // Add other configuration variables as needed
  };
  
  export default config;

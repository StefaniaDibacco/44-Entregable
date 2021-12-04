import dotenv from 'dotenv';
import args from 'args';

dotenv.config();

const options = [
  {
    name: 'port',
    description: 'The port on which the app runs',
  },
  {
    name: 'faceId',
    description: 'Facebook app ID',
  },
  {
    name: 'faceSecret',
    description: 'Facebook app secret',
  },
  {
    name: 'mode',
    description: 'run in fork or cluster mode',
  },
  {
    name: 'run',
    description: 'forever or pm2',
  },
];

args.options(options);

const flags = args.parse(process.argv);

const env = {
  MONGO_ATLAS_URL: process.env.MONGO || 'mongoSRV',
  PORT: process.env.PORT || process.env.NODE_PORT || flags.port,
  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || flags.faceId || 'faceId',
  FACEBOOK_APP_SECRET:
    process.env.FACEBOOK_APP_SECRET || flags.faceSecret || 'faceSecret',
  ETHEREAL_EMAIL: process.env.ETHEREAL_EMAIL || 'yourEmailAccount',
  ETHEREAL_PASSWORD: process.env.ETHEREAL_PASSWORD || 'yourEmailPassword',
  ETHEREAL_NAME: process.env.ETHEREAL_NAME || 'yourName',
  GMAIL_EMAIL: process.env.GMAIL_EMAIL || 'email@gmail.com',
  GMAIL_PASSWORD: process.env.GMAIL_PASSWORD || 'password',
  GMAIL_NAME: process.env.GMAIL_NAME || 'GMAIL owner name',
  TWILIO_ACCOUNT_ID: process.env.TWILIO_ACCOUNT_ID || 'twilioId',
  TWILIO_TOKEN: process.env.TWILIO_TOKEN || 'twilioToken',
  TWILIO_CELLPHONE: process.env.TWILIO_CELLPHONE || '+123456789',
};

console.log('ID del proceso =>', process.pid);

export default env;

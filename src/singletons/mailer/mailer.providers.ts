import { MAILING_PROVIDER } from 'src/utils/constants';

import { createTransport } from 'nodemailer';
import Mail = require('nodemailer/lib/mailer');

export const mailerProviders = [
  {
    provide: MAILING_PROVIDER,
    useFactory: async () => {
      (Mail as any).Promise = global.Promise;
      const {
        MAIL_HOST,
        MAIL_HOST_PORT,
        MAIL_USER,
        MAIL_PASSWORD,
      } = process.env;

      if (!MAIL_HOST || !MAIL_HOST_PORT || !MAIL_USER || !MAIL_PASSWORD) {
        throw new Error('Invalid mail setup env variables');
      }

      return createTransport({
        host: MAIL_HOST,
        port: Number(MAIL_HOST_PORT),
        auth: {
          user: MAIL_USER,
          pass: MAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
    },
  },
];

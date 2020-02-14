import { Injectable, Inject, Scope } from '@nestjs/common';
import { MAILING_PROVIDER } from 'src/utils/constants';

import Mail = require('nodemailer/lib/mailer');

@Injectable({ scope: Scope.DEFAULT })
export class MailerService {
  constructor(
    @Inject(MAILING_PROVIDER)
    private readonly mailTransporter: Mail,
  ) {}

  async sendEmail(to: string, subject: string, text: string) {
    const from: string = this.mailTransporter.options['auth'].user;
    const mail = {
      to,
      subject,
      text,
      from,
    };
    try {
      await this.mailTransporter.sendMail(mail);
    } catch (err) {
      throw err;
    }
  }
}

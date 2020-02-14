import { Worker } from './worker.class';
import { HintoSdkService } from 'src/services/hinto-sdk.service';
import { MailerService } from 'src/services/mailer.service';
import { OwnersDaoService } from 'src/modules/owners/owners.dao.service';

export class TxSubmissionWorker extends Worker {
  constructor(
    private readonly hintoSdkService: HintoSdkService,
    private readonly ownerDaoService: OwnersDaoService,
    private readonly mailerService: MailerService,
    frequency?: number,
  ) {
    super(frequency);
  }

  async job() {
    this.hintoSdkService
      .getInstance()
      .onTransactionSubmission(
        async (transactionID: number, submittedBy: string) => {
          const owners = (await this.ownerDaoService.getAll()).map(owner => {
            return owner.email;
          });
          for (const owner in owners) {
            if (owner !== 'PENDING') {
              await this.mailerService.sendEmail(
                owner,
                'Hinto Multisig transaction submission',
                `Newly submitted transaction is awaiting to be confirmed, details: txId: ${transactionID}, submitted by: ${submittedBy}`,
              );
            }
          }
        },
      );
  }
}

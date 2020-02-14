import { Controller } from '@nestjs/common';
import { OwnersDaoService } from 'src/modules/owners/owners.dao.service';
import { HintoSdkService } from 'src/services/hinto-sdk.service';
import { MailerService } from 'src/services/mailer.service';

import { TxSubmissionWorker } from './tx.submission.worker';
import { OwnersRegistryWorker } from './owners.registry.worker';

@Controller()
export class WorkersController {
  constructor(
    private readonly ownerDaoService: OwnersDaoService,
    private readonly hintoSdkService: HintoSdkService,
    private readonly mailerService: MailerService,
  ) {
    new TxSubmissionWorker(
      this.hintoSdkService,
      this.ownerDaoService,
      this.mailerService,
    ).run();

    new OwnersRegistryWorker(
      this.hintoSdkService,
      this.ownerDaoService,
      1000 * 60 * 2,
    ).run();
  }
}

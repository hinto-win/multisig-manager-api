import { Module } from '@nestjs/common';
import { WorkersController } from './workers.controller';
import { DatabaseModule } from 'src/singletons/database/database.module';
import { MailerModule } from 'src/singletons/mailer/mailer.module';
import { HintoSdkModule } from 'src/singletons/hinto-sdk/hinto-sdk.module';
import { OwnersDaoService } from 'src/modules/owners/owners.dao.service';
import { ownersDatabaseProviders } from 'src/modules/owners/owners.providers';
import { HintoSdkService } from 'src/services/hinto-sdk.service';
import { MailerService } from 'src/services/mailer.service';

@Module({
  controllers: [WorkersController],
  imports: [DatabaseModule, HintoSdkModule, MailerModule],
  providers: [
    OwnersDaoService,
    ...ownersDatabaseProviders,
    HintoSdkService,
    MailerService,
  ],
})
export class WorkersModule {}

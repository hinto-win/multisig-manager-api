import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/singletons/database/database.module';
import { HintoSdkModule } from 'src/singletons/hinto-sdk/hinto-sdk.module';
import { OwnersController } from './owners.controller';
import { OwnersDaoService } from './owners.dao.service';
import { ownersDatabaseProviders } from './owners.providers';
import { HintoSdkService } from 'src/services/hinto-sdk.service';

@Module({
  imports: [HintoSdkModule, DatabaseModule],
  controllers: [OwnersController],
  providers: [HintoSdkService, OwnersDaoService, ...ownersDatabaseProviders],
})
export class OwnersModule {}

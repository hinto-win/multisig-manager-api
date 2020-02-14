import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/singletons/database/database.module';
import { HintoSdkModule } from 'src/singletons/hinto-sdk/hinto-sdk.module';
import { NotesController } from './notes.controller';
import { NotesDaoService } from './notes.dao.service';
import { notesDatabaseProviders } from './notes.providers';
import { HintoSdkService } from 'src/services/hinto-sdk.service';

@Module({
  imports: [DatabaseModule, HintoSdkModule],
  controllers: [NotesController],
  providers: [HintoSdkService, NotesDaoService, ...notesDatabaseProviders],
})
export class NotesModule {}

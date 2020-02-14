import { Module } from '@nestjs/common';
import { WorkersModule } from './workers/workers.module';
import { OwnersModule } from './modules/owners/owners.module';
import { NotesModule } from './modules/notes/notes.module';

@Module({
  imports: [WorkersModule, OwnersModule, NotesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Connection } from 'mongoose';

import { NoteDatabaseSchema } from './note.database.schema';
import { NOTE_SCHEMA_TOKEN, DATABASE_PROVIDER } from '../../utils/constants';

export const notesDatabaseProviders = [
  {
    provide: NOTE_SCHEMA_TOKEN,
    useFactory: (connection: Connection) =>
      connection.model('note', NoteDatabaseSchema),
    inject: [DATABASE_PROVIDER],
  },
];

import { Connection } from 'mongoose';

import { OwnerDatabaseSchema } from './owner.database.schema';
import { NOTE_SCHEMA_TOKEN, DATABASE_PROVIDER } from '../../utils/constants';

export const ownersDatabaseProviders = [
  {
    provide: NOTE_SCHEMA_TOKEN,
    useFactory: (connection: Connection) =>
      connection.model('owner', OwnerDatabaseSchema),
    inject: [DATABASE_PROVIDER],
  },
];

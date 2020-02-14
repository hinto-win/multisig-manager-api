import { Connection } from 'mongoose';

import { OwnerDatabaseSchema } from './owner.database.schema';
import { DATABASE_PROVIDER, OWNER_SCHEMA_TOKEN } from '../../utils/constants';

export const ownersDatabaseProviders = [
  {
    provide: OWNER_SCHEMA_TOKEN,
    useFactory: (connection: Connection) =>
      connection.model('owner', OwnerDatabaseSchema),
    inject: [DATABASE_PROVIDER],
  },
];

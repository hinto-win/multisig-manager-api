import * as mongoose from 'mongoose';
import { DATABASE_PROVIDER } from '../../utils/constants';

export const databaseProviders = [
  {
    provide: DATABASE_PROVIDER,
    useFactory: async () => {
      (mongoose as any).Promise = global.Promise;
      return await mongoose.connect(
        `mongodb://${process.env.MONGODB_HOST}:27017/${process.env.MONGODB_NAME}`,
      );
    },
  },
];

import { Document } from 'mongoose';

export interface Owner {
  address: string;
  email?: string;
}

export interface OwnerDatabaseDocument extends Owner, Document {}

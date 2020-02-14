import { Document } from 'mongoose';

export interface Note {
  transactionID: number;
  submitter: string;
  body: string;
}

export interface NoteDatabaseDocument extends Note, Document {}

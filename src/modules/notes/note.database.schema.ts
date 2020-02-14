import { Schema } from 'mongoose';

export const NoteDatabaseSchema = new Schema({
  transactionID: {
    type: Number,
    unique: true,
    required: true,
    index: true,
  },
  submitter: {
    type: String,
    required: true,
    index: true,
  },
  body: {
    type: String,
    required: true,
  },
});

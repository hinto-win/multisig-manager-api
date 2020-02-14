import { Schema } from 'mongoose';

export const OwnerDatabaseSchema = new Schema({
  address: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    default: 'PENDING',
    unique: false,
  },
});

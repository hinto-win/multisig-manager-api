import { Injectable, Inject } from '@nestjs/common';
import { NOTE_SCHEMA_TOKEN } from 'src/utils/constants';
import { Model } from 'mongoose';
import { NoteDatabaseDocument, Note } from './note.interface';

@Injectable()
export class NotesDaoService {
  constructor(
    @Inject(NOTE_SCHEMA_TOKEN)
    private readonly noteModel: Model<NoteDatabaseDocument>,
  ) {}

  async create(note: Note): Promise<NoteDatabaseDocument> {
    try {
      return await new this.noteModel(note).save();
    } catch (err) {
      throw err;
    }
  }

  async getByTransactionID(
    transactionID: number,
  ): Promise<NoteDatabaseDocument> {
    return await this.noteModel.findOne({ transactionID });
  }

  async getByTransactionIDFromTo(
    from: number,
    to: number,
  ): Promise<NoteDatabaseDocument[]> {
    if (from >= to) {
      throw new Error('$from argument cannot be greater than $to argument');
    }

    return await this.noteModel.find({
      transactionID: { $gte: from, $lte: to },
    });
  }

  async updateBody(
    transactionID: number,
    updatedBody: string,
  ): Promise<NoteDatabaseDocument> {
    const note = await this.getByTransactionID(transactionID);
    if (!note) {
      return null;
    }
    note.body = updatedBody;
    return await note.save();
  }
}

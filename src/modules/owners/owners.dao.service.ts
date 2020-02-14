import { Injectable, Inject } from '@nestjs/common';
import { OWNER_SCHEMA_TOKEN } from 'src/utils/constants';
import { Model } from 'mongoose';
import { OwnerDatabaseDocument, Owner } from './owner.interface';

@Injectable()
export class OwnersDaoService {
  constructor(
    @Inject(OWNER_SCHEMA_TOKEN)
    private readonly ownerModel: Model<OwnerDatabaseDocument>,
  ) {}

  async create(owner: Owner): Promise<OwnerDatabaseDocument> {
    return await new this.ownerModel(owner).save();
  }

  async getByAddress(address: string): Promise<OwnerDatabaseDocument> {
    return await this.ownerModel.findOne({ address });
  }

  async getByEmail(email: string): Promise<OwnerDatabaseDocument[]> {
    return await this.ownerModel.find({ email });
  }

  async getAll(): Promise<OwnerDatabaseDocument[]> {
    return await this.ownerModel.find({});
  }

  async deleteByAddress(address: string): Promise<boolean> {
    const removed = await this.ownerModel.findOneAndDelete({ address });

    if (!removed) {
      return false;
    }
    return true;
  }
}

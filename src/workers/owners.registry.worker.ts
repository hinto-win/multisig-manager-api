import { Worker } from './worker.class';
import { HintoSdkService } from 'src/services/hinto-sdk.service';
import { OwnersDaoService } from 'src/modules/owners/owners.dao.service';

import { xor, intersection } from 'lodash';

export class OwnersRegistryWorker extends Worker {
  constructor(
    private readonly hintoSdkService: HintoSdkService,
    private readonly ownersDaoService: OwnersDaoService,
    frequency?: number,
  ) {
    super(frequency);
  }

  async job() {
    const currentOwners = (await this.ownersDaoService.getAll()).map(owner => {
      return owner.address;
    });
    const ownersUpdate = await this.hintoSdkService.getInstance().getOwners();

    const mutualOwners = intersection(currentOwners, ownersUpdate);

    const toRemove = xor(currentOwners, mutualOwners);
    const toAdd = xor(ownersUpdate, mutualOwners);

    for (const owner in toRemove) {
      await this.ownersDaoService.deleteByAddress(owner);
    }

    for (const owner in toAdd) {
      await this.ownersDaoService.create({ address: owner });
    }
  }
}

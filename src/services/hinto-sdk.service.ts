import { Injectable, Inject, Scope } from '@nestjs/common';
import { HINTO_SDK_PROVIDER } from 'src/utils/constants';

import { HintoMultisigSdk } from 'hinto-contracts-sdk';

@Injectable({ scope: Scope.DEFAULT })
export class HintoSdkService {
  constructor(
    @Inject(HINTO_SDK_PROVIDER)
    private readonly hintoMultisigSdk: HintoMultisigSdk,
  ) {}

  getInstance(): HintoMultisigSdk {
    return this.hintoMultisigSdk;
  }
}

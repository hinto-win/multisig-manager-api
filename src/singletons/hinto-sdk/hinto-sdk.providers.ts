import { HintoMultisigSdk } from 'hinto-contracts-sdk';
import { HINTO_SDK_PROVIDER } from '../../utils/constants';

import { randomBytes } from 'crypto';

export const hintoSdkProviders = [
  {
    provide: HINTO_SDK_PROVIDER,
    useFactory: async () => {
      (HintoMultisigSdk as any).Promise = global.Promise;
      const {
        ETHEREUM_PROVIDER_URL,
        ETHEREUM_MULTISIG_ADDRESS,
        ETHEREUM_PRIVATE_KEY,
      } = process.env;

      if (!ETHEREUM_PROVIDER_URL || !ETHEREUM_MULTISIG_ADDRESS) {
        throw new Error('Invalid multisig configuration');
      }
      const privateKey =
        ETHEREUM_PRIVATE_KEY || `0x${randomBytes(32).toString('hex')}`;
      return new HintoMultisigSdk(
        ETHEREUM_PROVIDER_URL,
        ETHEREUM_MULTISIG_ADDRESS,
        privateKey,
      );
    },
  },
];

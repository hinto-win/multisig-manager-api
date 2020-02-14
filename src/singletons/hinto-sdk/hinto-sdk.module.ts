import { Module } from '@nestjs/common';
import { hintoSdkProviders } from './hinto-sdk.providers';

@Module({
  providers: [...hintoSdkProviders],
  exports: [...hintoSdkProviders],
})
export class HintoSdkModule {}

import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { HintoMultisigSdk } from 'hinto-contracts-sdk';
import { SetEmailDto } from './owners.dtos';

import { utils } from 'ethers';
import { SHA256, enc } from 'crypto-js';
import { OwnersDaoService } from './owners.dao.service';

@Controller('owners')
export class OwnersController {
  constructor(
    private readonly hintoSdkService: HintoMultisigSdk,
    private readonly ownersDaoService: OwnersDaoService,
  ) {}

  @Post('set-email')
  async setEmail(@Body() dto: SetEmailDto) {
    const payload = SHA256(
      `${this.hintoSdkService.getMultisigAddress()}.${dto.email}`,
    ).toString(enc.Hex);

    const signer = utils.recoverAddress(payload, dto.signature);
    const isOwner = await this.hintoSdkService.isOwner(signer);

    if (!isOwner) {
      throw new HttpException(
        'Signature does not match any owner',
        HttpStatus.BAD_REQUEST,
      );
    }

    let owner = await this.ownersDaoService.getByAddress(signer);

    if (!owner) {
      owner = await this.ownersDaoService.create({
        address: signer,
        email: dto.email,
      });
    }

    return { message: 'Email set' };
  }

  @Get('get-email:/address')
  async getEmail(@Param('address') address: string) {
    if (!utils.isHexString(address)) {
      throw new HttpException(
        'Invalid ethereum address has been given',
        HttpStatus.BAD_REQUEST,
      );
    }

    const owner = await this.ownersDaoService.getByAddress(address);

    if (!owner) {
      throw new HttpException(
        'The given address is not an owner',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (owner.email === 'PENDING') {
      return { message: "The given owner did not set it's email" };
    }

    return { email: owner.email };
  }
}

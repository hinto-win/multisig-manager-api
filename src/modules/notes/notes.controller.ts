import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';

import { NotesDaoService } from './notes.dao.service';
import { HintoSdkService } from 'src/services/hinto-sdk.service';

import { DescribeTransactionDto } from './notes.dtos';

import { SHA256, enc } from 'crypto-js';
import { utils } from 'ethers';

@Controller('notes')
export class NotesController {
  constructor(
    private readonly hintoSdkService: HintoSdkService,
    private readonly notesDaoService: NotesDaoService,
  ) {}

  @Post('describe-transaction')
  async describeTransaction(@Body() dto: DescribeTransactionDto) {
    const descriptionHash = `0x${SHA256(dto.description).toString(enc.Hex)}`;

    const address = await this.hintoSdkService
      .getInstance()
      .getMultisigAddress();

    const payload = `${address}.${dto.transactionID}.${descriptionHash}`;

    const signer = utils.verifyMessage(payload, dto.signature);

    const isOwner = await this.hintoSdkService.getInstance().isOwner(signer);

    if (!isOwner) {
      throw new HttpException(
        'Signature does not match any owner',
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingNote = await this.notesDaoService.getByTransactionID(
      dto.transactionID,
    );

    if (existingNote) {
      if (existingNote.submitter !== signer) {
        throw new HttpException(
          'In case of overwritting an existing note, no other signer than the submitter can do it',
          HttpStatus.UNAUTHORIZED,
        );
      }

      await this.notesDaoService.updateBody(dto.transactionID, dto.description);
      return { success: true };
    }

    await this.notesDaoService.create({
      transactionID: dto.transactionID,
      submitter: signer,
      body: dto.description,
    });

    return { success: true };
  }

  @Get('description-by-tx-id/:txID')
  async getDescriptionByTxID(@Param('txID') txID: number) {
    try {
      txID = parseInt(txID.toString());
    } catch (err) {
      throw new HttpException('Invalid param type', HttpStatus.BAD_REQUEST);
    }

    const note = await this.notesDaoService.getByTransactionID(txID);

    if (!note) {
      return { description: null };
    }

    return { description: note.body, submitter: note.submitter };
  }

  @Get('descriptions-by-tx-ids/:from/:to')
  async getDescriptionsByTxIds(
    @Param('from') from: number,
    @Param('to') to: number,
  ) {
    try {
      from = parseInt(from.toString());
    } catch (err) {
      throw new HttpException('Invalid param type', HttpStatus.BAD_REQUEST);
    }

    try {
      to = parseInt(to.toString());
    } catch (err) {
      throw new HttpException('Invalid param type', HttpStatus.BAD_REQUEST);
    }

    const notes = await this.notesDaoService.getByTransactionIDFromTo(from, to);

    let descriptions = {};

    notes.map(note => {
      descriptions[note.transactionID] = {
        description: note.body,
        submitter: note.submitter,
      };
    });

    return descriptions;
  }
}

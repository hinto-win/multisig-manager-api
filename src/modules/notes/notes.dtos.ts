import { IsNotEmpty, IsInt } from 'class-validator';

export class DescribeTransactionDto {
  @IsNotEmpty()
  @IsInt()
  readonly transactionID: number;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly signature: string;
}

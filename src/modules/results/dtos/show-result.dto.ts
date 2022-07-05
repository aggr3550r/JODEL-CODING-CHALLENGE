import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class ShowResultDTO {
  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  frequency_counter: {};
}

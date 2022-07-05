import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateResultDTO {
  @IsNotEmpty()
  @IsString()
  @Expose()
  survey_id: string;

  @IsNotEmpty()
  @Expose()
  answer_id: number;
}

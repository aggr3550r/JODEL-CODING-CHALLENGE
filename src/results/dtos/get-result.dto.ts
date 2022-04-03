import { IsNotEmpty, IsString } from "class-validator";

export class GetResultDTO {
    @IsNotEmpty()
    @IsString()
    survey_id: string
}
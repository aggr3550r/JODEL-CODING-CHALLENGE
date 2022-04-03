import {IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateResultDTO {
    @IsNotEmpty()
    @IsString()
    survey_id: string;


    @IsNotEmpty()
    answer_id: number;
}
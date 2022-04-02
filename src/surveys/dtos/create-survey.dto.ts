import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";


export class CreateSurveyDTO {
    @Expose()
    @IsNotEmpty()
    question: string;

    @Expose()
    @IsNotEmpty()
    options: [];
}
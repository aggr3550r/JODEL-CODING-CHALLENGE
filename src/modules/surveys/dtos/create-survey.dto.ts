import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Options } from "../types/options.type";


export class CreateSurveyDTO {
    @Expose()
    @IsNotEmpty()
    question: string;

    @Expose()
    @IsNotEmpty()
    options: Options[];
}
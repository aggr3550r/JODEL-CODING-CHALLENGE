import { Expose } from "class-transformer";
import { Options } from "../types/options.type";

export class SurveyDTO {
    @Expose()
    question: string;
    @Expose()
    options: Options[];
}


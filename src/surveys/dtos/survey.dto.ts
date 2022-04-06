import { Expose } from "class-transformer";

export class SurveyDTO {
    @Expose()
    question: string;
    @Expose()
    options: {}[];
}


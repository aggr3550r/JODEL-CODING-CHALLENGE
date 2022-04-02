import { Expose, Transform } from "class-transformer";

export class SurveyDTO {
    @Expose()
    id: number;
    @Expose()
    question: string;
    @Expose()
    options: [];
}


import { Expose } from "class-transformer";


export class ResultDTO {
    @Expose()
    survey_id: string;

    @Expose()
    answer_id: number;
}
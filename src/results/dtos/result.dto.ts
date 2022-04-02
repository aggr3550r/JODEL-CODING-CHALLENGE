import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";


export class ResultDTO {
    @Expose()
    survey_id: string;

    @Expose()
    answer_id: number;
}
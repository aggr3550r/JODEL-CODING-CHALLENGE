import {IsNotEmpty} from "class-validator";
import { Expose } from "class-transformer";
import { ObjectID } from "src/types/object-id.type";

export class GetSurveyDTO {
    @Expose()
    @IsNotEmpty()
    id: ObjectID;

    @Expose()
    @IsNotEmpty()
    question: string;

    @Expose()
    @IsNotEmpty()
    options: string;
}
import {IsNotEmpty} from "class-validator";
import { Expose } from "class-transformer";
import mongoose from "mongoose";

export class GetSurveyDTO {
    @Expose()
    @IsNotEmpty()
    id: mongoose.Types.ObjectId;

    @Expose()
    @IsNotEmpty()
    question: string;

    @Expose()
    @IsNotEmpty()
    options: string;
}
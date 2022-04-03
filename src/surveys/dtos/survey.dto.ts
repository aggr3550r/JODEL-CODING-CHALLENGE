import { Expose, Transform } from "class-transformer";
import mongoose from "mongoose";

export class SurveyDTO {
    // @Expose()
    // id: string;
    @Expose()
    question: string;
    @Expose()
    options: {}[];
}


import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';


export type ResultDocument = Result & Document;

@Schema()
export class Result extends Document {
    @Prop()
    survey_id: string;

    @Prop()
    answer_id: number;

    @Prop()
    answer_ids: number[];
}

export const ResultSchema = SchemaFactory.createForClass(Result)
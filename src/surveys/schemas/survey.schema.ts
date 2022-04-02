import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Options } from '../types/options.type'

export type SurveyDocument = Survey & Document;

@Schema()
export class Survey extends Document{
    @Prop()
    question: string;

    @Prop()
    options: [Options];
}

export const SurveySchema = SchemaFactory.createForClass(Survey)






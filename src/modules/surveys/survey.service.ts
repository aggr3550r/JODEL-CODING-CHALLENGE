import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Survey } from './schemas/survey.schema';
import { SurveyDocument } from './schemas/survey.schema';
import { CreateSurveyDTO } from './dtos/create-survey.dto';

@Injectable()
export class SurveyService {
    constructor(@InjectModel(Survey.name) private SurveyModel: Model<SurveyDocument>) {}

    async createSurvey(question: string, options: {}[]): Promise<CreateSurveyDTO> {
        const survey =  await this.SurveyModel.create({question, options});
        return survey.save();
    }

    async find(id: mongoose.Types.ObjectId) {
        return await this.SurveyModel.find({id});
    }

    async findOne(id: mongoose.Types.ObjectId) {
        if(!id){
            return null;
        }
        return await this.SurveyModel.findById(id).exec();
    }

    async getAllSurveys() {
        const filter = {};
        const surveys = await this.SurveyModel.find({filter})
        return surveys;
    }
    
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Result } from './schemas/result.schema';
import { ResultDocument } from './schemas/result.schema';
import { Survey, SurveyDocument } from '../surveys/schemas/survey.schema';


@Injectable()
export class ResultService {
  constructor(
    @InjectModel(Result.name) private ResultModel: Model<ResultDocument>,
    @InjectModel(Survey.name) private SurveyModel: Model<SurveyDocument>,
  ) {}

  /* Helper routine:
    Helps takeSurvey() do its job by asynchronously creating some data in the mongoose document
    */
  async create(survey_id: string, answer_id: number) {
    const answer = await this.ResultModel.create({ survey_id, answer_id });
    return await answer.save();
  }

  async find(id: string) {
    return await this.ResultModel.find({ id });
  }

  async findOne(id: string) {
    if (!id) {
      return null;
    }
    return await this.ResultModel.findById(id).exec();
  }

  /* Main routine:
    Collect survey and submit it to the result collection
    */
  async takeSurvey(survey_id: string, answer_id: number) {
    const answer = await this.ResultModel.find({}).select('survey_id');

    /*Create an array of all the survey_ids in the document*/
    const survey_ids = [];
    answer.forEach((e) => {
      survey_ids.push(e.survey_id);
    });

    /*If the provided survey_id does not yet exist in the collection*/
    if (!survey_ids.includes(survey_id)) {
      /*create a new document in the collection with the new survey_id*/
      await this.ResultModel.create({ survey_id, answer_id });

      /*find the new document and update its answer_ids array*/
      return await this.ResultModel.findOneAndUpdate(
        { survey_id: survey_id },
        { $push: { answer_ids: answer_id }, $set: { answer_id: answer_id } },
      ).exec();
    } else {

    /*If the provided survey_id already exists in the collection*/
      /*simply find the document and update its answer_ids array*/
      return await this.ResultModel.findOneAndUpdate(
        { survey_id: survey_id },
        { $push: { answer_ids: answer_id }, $set: { answer_id: answer_id } },
      ).exec();
    }
  }

  /* Main routine:
   Gets the results of a survey witha paid id
    */
   async getResultsOfASurvey(survey_id: string) {
        const surveys = await this.SurveyModel.find().select({
            __v: 0
        });
        const results = await this.ResultModel.find().select({survey_id: 1, answer_ids:1, _id: 0})

        /*
        Find a question in the surveys collection that matches the survey_id passed as an argument
        */
        const requested_result = results.find(x => x.survey_id === survey_id);

        /*
        Create an 
        */
        const question_array = [surveys.find(x => x.id === requested_result.survey_id)];

        const { question } = question_array[0];

        const answer_ids = requested_result.answer_ids;

        const answers_so_far = []
        answer_ids.forEach((answer_id) => {
            answers_so_far.push(question_array[0].options.find(x => x.id === answer_id).option)
        });

       return {question, answers_so_far};
}
}

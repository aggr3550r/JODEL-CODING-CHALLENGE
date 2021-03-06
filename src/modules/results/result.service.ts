import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Result } from './schemas/result.schema';
import { ResultDocument } from './schemas/result.schema';
import { Survey, SurveyDocument } from '../surveys/schemas/survey.schema';
import { ShowResultDTO } from './dtos/show-result.dto';
import { CreateResultDTO } from './dtos/create-result.dto';

@Injectable()
export class ResultService {
  constructor(
    @InjectModel(Result.name) private ResultModel: Model<ResultDocument>,
    @InjectModel(Survey.name) private SurveyModel: Model<SurveyDocument>,
  ) {}

  /* Helper routine:
    Helps  addAResultByTakingASurvey() do its job by asynchronously creating some data in the mongoose document
    */
  async create(body: CreateResultDTO) {
    const answer = await this.ResultModel.create(body);
    return await answer.save();
  }

  /* Main routine:
    Collects user response and submits it to the result collection
    */
  async addAResultByTakingASurvey(
    body: CreateResultDTO,
  ): Promise<CreateResultDTO> {
    const survey_id = body.survey_id,
      answer_id = body.answer_id;
    const answer = await this.ResultModel.find({}).select('survey_id');

    const valid_survey_id = answer.find((x) => x.survey_id === survey_id);

    if (!valid_survey_id) {
      await this.ResultModel.create(body);
      return await this.ResultModel.findOneAndUpdate(
        { survey_id: survey_id },
        { $push: { answer_ids: answer_id }, $set: { answer_id: answer_id } },
      ).exec();
    } else {
      return await this.ResultModel.findOneAndUpdate(
        { survey_id: survey_id },
        { $push: { answer_ids: answer_id }, $set: { answer_id: answer_id } },
      ).exec();
    }
  }

  /* Main routine:
    Gets the results of a survey with a passed id
      */
  async getResultsOfASurvey(survey_id: string): Promise<ShowResultDTO> {
    const results = await this.ResultModel.find(
      {},
      { survey_id: survey_id, answer_ids: 1, _id: 0 },
    );

    let answer_ids = results[0].answer_ids;
    const valid_answer_ids = [];
    const frequency_counter = {};

    const survey = await this.SurveyModel.findById(survey_id).exec();
    survey.options.forEach((obj) => {
      valid_answer_ids.push(obj.id);
    });

    const question = survey.question;

    answer_ids.forEach((answer_id) => {
      if (!valid_answer_ids.includes(answer_id)) {
        answer_ids = answer_ids.filter((x) => x !== answer_id);
      }
    });

    for (let i = 0; i < answer_ids.length; i++) {
      if (frequency_counter[answer_ids[i]]) {
        frequency_counter[answer_ids[i]] += 1;
      } else {
        frequency_counter[answer_ids[i]] = 1;
      }
    }

    for (let key in frequency_counter) {
      let obj = survey.options.find((x) => x.id === parseInt(key));
      frequency_counter[obj.option] = frequency_counter[key];
      delete frequency_counter[key];
    }
    return { question, frequency_counter };
  }
}

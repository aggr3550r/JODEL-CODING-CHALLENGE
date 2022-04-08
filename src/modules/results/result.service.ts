import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Result } from './schemas/result.schema';
import { ResultDocument } from './schemas/result.schema';
import { Survey, SurveyDocument } from '../surveys/schemas/survey.schema';
import { ShowResultDTO } from './dtos/show-result.dto';
import { CreateResultDTO } from './dtos/create-result.dto';
import { ObjectID } from 'src/types/object-id.type';


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

  /* Main routine:
    Collects user response and submits it to the result collection
    */
  async addAResultByTakingASurvey(survey_id: string, answer_id: number): Promise<CreateResultDTO> {
    const answer = await this.ResultModel.find({}).select('survey_id');

    /*check if the survey_id passed already exists as a valid survey_id in the results collection*/
    const valid_survey_id = answer.find((x) => x.survey_id === survey_id);
    
    if(!valid_survey_id) {
      /*create a new document in the collection with the new survey_id*/
     await this.ResultModel.create({ survey_id, answer_id });

      /*find the document that was just created  and update its answer_ids array*/
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
   Gets the results of a survey with a passed id
    */
   async getResultsOfASurvey(survey_id: string): Promise<ShowResultDTO> {
        const surveys = await this.SurveyModel.find().select({
            __v: 0
        });
        const results = await this.ResultModel.find().select({survey_id: 1, answer_ids:1, _id: 0})

        /*
        Find a question in the surveys collection that matches the survey_id passed as an argument
        */
        const requested_result = results.find(x => x.survey_id === survey_id );

        
        /* If the survey_id given by the user does not match any question in the surveys collection,
        simply throw an exception and notify the user that the survey_id they passed is invalid
        */
        if(!requested_result) {
         throw new NotFoundException(`Either no one has answered a survey with id of ${survey_id} or it doesn't exist in the first place.`);
       }

       console.log(requested_result);
        /*
        Retrieve the question object in the results collection that matches the survey_id passed
        */
        const question_object = surveys.find(x => x.id === requested_result.survey_id);

        
        const { question } = question_object;

        //array containing all the valid ids in the options array
        const valid_ids = [];
        question_object.options.forEach((obj) => {
            valid_ids.push(obj.id);
        })

        //array containing all the responses pertaining to a particular question
        let answer_ids = requested_result.answer_ids;

        //sanitize the answer_ids based on the valid_ids
        answer_ids.forEach((id) => {
          if(!(valid_ids.includes(id))){
            answer_ids = answer_ids.filter(x => x !== id)
          }
        })

        //array containing answers that users have provided
        const answers_so_far = [];
        answer_ids.forEach((answer_id) => {
            answers_so_far.push(question_object.options.find(x => x.id === answer_id).option)
        })

      return {question, answers_so_far};
}
}

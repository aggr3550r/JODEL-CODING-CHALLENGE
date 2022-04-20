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
    Helps  addAResultByTakingASurvey() do its job by asynchronously creating some data in the mongoose document
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
    async getResultsOfASurvey(survey_id: ObjectID) {
      /* 1.
      find the element in the results collection that matches the survey_id passed above
      */
      const results = await this.ResultModel.find({}, {survey_id: survey_id, answer_ids: 1, _id:0});
     
      let answer_ids = results[0].answer_ids;
      const valid_answer_ids = [];
      const frequency_counter = {};

      /* 2.
      check the surveys collection, find all the valid_ids in the options array of the survey that matches the above survey_id 
      */
      const survey = await this.SurveyModel.findById(survey_id).exec();
      survey.options.forEach((obj) => {
          valid_answer_ids.push(obj.id);
      })

      /* 3.
        find all the answer_ids in the result that matches the survey_id and then filter the array based on the valid_ids
      */
      answer_ids.forEach((answer_id) => {
        if(!valid_answer_ids.includes(answer_id)) {
            answer_ids = answer_ids.filter(x => x !== answer_id)
          }
       })

        /* 4.
        take the filtered array and then use a frequency_counter to keep track of how many times
        every value occurs; frequency_counter will be a hash map
      */
      for(let i = 0; i < answer_ids.length; i++) {
          if(frequency_counter[answer_ids[i]]) {
            frequency_counter[answer_ids[i]] += 1;
          }
          else {
            frequency_counter[answer_ids[i]] = 1;
          }
      }
      
      for(let key in frequency_counter) {
        //find the object in the options array with an id that corresponds to the key
        let obj = survey.options.find(x => x.id === parseInt(key))
        //take the option property of that object
        //replace the key in frequency counter with this option
        frequency_counter[obj.option] = frequency_counter[key];
        delete frequency_counter[key];
      }
      return [survey.question , frequency_counter];

    }

}



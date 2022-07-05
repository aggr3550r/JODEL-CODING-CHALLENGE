import { CreateResultDTO } from 'src/modules/results/dtos/create-result.dto';
import { ObjectID } from 'typeorm';

export const takeSurveyStub = (): CreateResultDTO => {
  return {
    survey_id: '6245f88cd8148670691f8e5b',
    answer_id: 2,
  };
};

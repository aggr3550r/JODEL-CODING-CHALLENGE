import { CreateResultDTO } from '../../dtos/create-result.dto';

/**
 * This is a stub. It is essentially a function that returns data that we will need in our test.

 * This data is sample data and is fashioned to look exactly like what the function being tested will have to take as an argument or return as a value.

 * Stubs are important because they eliminate the need for our tests to contain any data processing logic, amongst other benefits of this, our unit tests will be much faster.

 * **/

export const takeSurveyStub = (): CreateResultDTO => {
  return {
    survey_id: '6245f88cd8148670691f8e5b',
    answer_id: 2,
  };
};

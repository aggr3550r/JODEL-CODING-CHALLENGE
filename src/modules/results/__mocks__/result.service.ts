import { showResultStub } from '../test/stubs/show-result.stub';
import { takeSurveyStub } from '../test/stubs/take-survey.stub';

/**
 * Here we are mocking the functions in a provider
 * The functions in the controller we are to test depend on this provider
 **/

export const ResultService = jest.fn().mockReturnValue({
  addAResultByTakingASurvey: jest.fn().mockReturnValue(takeSurveyStub()),
  getResultsOfASurvey: jest.fn().mockReturnValue(showResultStub()),
});

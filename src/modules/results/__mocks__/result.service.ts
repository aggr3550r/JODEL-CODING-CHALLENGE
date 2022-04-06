import { showResultStub } from "../test/stubs/show-result.stub";
import { takeSurveyStub } from "../test/stubs/take-survey.stub";

export const ResultService = jest.fn().mockReturnValue({
    takeSurvey: jest.fn().mockReturnValue(takeSurveyStub()),
    getResultsOfASurvey: jest.fn().mockReturnValue(showResultStub())
});
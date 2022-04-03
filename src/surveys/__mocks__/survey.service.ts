import { surveyStub } from "../test/stubs/survey.stub";

export const SurveyService = jest.fn().mockReturnValue({
    createSurvey: jest.fn().mockReturnValue(surveyStub())
});
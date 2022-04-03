import { Test, TestingModule } from '@nestjs/testing';
import { CreateSurveyDTO } from '../dtos/create-survey.dto';
import { Survey } from '../schemas/survey.schema';
import { SurveyController } from '../survey.controller';
import { SurveyService } from '../survey.service';
import { surveyStub } from './stubs/survey.stub';

jest.mock('../survey.service.ts');

describe('SurveyController', () => {
  let surveyController: SurveyController;
  let surveyService: SurveyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [SurveyController],
      providers: [SurveyService],
    }).compile();

    surveyController = module.get<SurveyController>(SurveyController);
    surveyService = module.get<SurveyService>(SurveyService);
    jest.clearAllMocks();
  });

  describe('createSurvey', () => {
    describe('when createSurvey is called', () => {
      let createSurveyDto: CreateSurveyDTO;
      let survey: Survey;

      beforeEach(async () => {
        createSurveyDto = {
          question: surveyStub().question,
          options: surveyStub().options,
        };

        survey = await surveyController.createSurvey(createSurveyDto);
      });

      test('then it should call surveyService', () => {
        expect(surveyService.createSurvey).toHaveBeenCalledWith(
          createSurveyDto.question,
          createSurveyDto.options,
        );
      });

      test('then it should return a survey', () => {
        expect(survey).toEqual(surveyStub());
      })
    });
  });
});

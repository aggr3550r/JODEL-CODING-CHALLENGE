import { Test, TestingModule } from '@nestjs/testing';
import { ResultService } from '../result.service';
import { ResultController } from '../result.controller';
import { CreateResultDTO } from '../dtos/create-result.dto';
import { Result } from '../schemas/result.schema';
import { takeSurveyStub } from './stubs/take-survey.stub';
import { ShowResultDTO } from '../dtos/show-result.dto';
import { showResultStub } from './stubs/show-result.stub';
import { GetResultDTO } from '../dtos/get-result.dto';

jest.mock('../result.service.ts');

describe('ResultController', () => {
  let resultController: ResultController;
  let resultService: ResultService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ResultController],
      providers: [ResultService],
    }).compile();

    resultController = moduleRef.get<ResultController>(ResultController);
    resultService = moduleRef.get<ResultService>(ResultService);
    jest.clearAllMocks();
  });

  describe('takeSurvey', () => {
    describe('when takeSurvey is called', () => {
      let createResultDto: CreateResultDTO;
      let result: Result;

      beforeEach(async () => {
        createResultDto = {
          survey_id: takeSurveyStub().survey_id,
          answer_id: takeSurveyStub().answer_id,
        };

        result = await resultController.takeSurvey(createResultDto);
      });

      test('then it should call resultService', () => {
        expect(resultService.takeSurvey).toHaveBeenCalledWith(
          createResultDto.survey_id,
          createResultDto.answer_id,
        );
      });

      test('then it should return a response/result', () => {
        expect(result).toEqual(takeSurveyStub());
      });
    });
  });

  describe('getResultsOfASurvey', () => {
    describe('when getResultsOfASurvey is called', () => {
      let result: ShowResultDTO;
      let getResultDto: GetResultDTO;

      beforeEach(async () => {
        getResultDto = {
          survey_id: takeSurveyStub().survey_id,
        };

        result = await resultController.getResultsOfASurvey(
          getResultDto.survey_id,
        );
      });

      test('then it should call resultService', () => {
        expect(resultService.getResultsOfASurvey).toHaveBeenCalledWith(
          getResultDto.survey_id,
        );
      });

      test('then it should return the results of a survey', () => {
        expect(result).toEqual(showResultStub());
      });
    });
  });
});

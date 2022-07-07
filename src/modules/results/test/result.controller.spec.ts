import { Test, TestingModule } from '@nestjs/testing';
import { ResultService } from '../result.service';
import { ResultController } from '../result.controller';
import { CreateResultDTO } from '../dtos/create-result.dto';
import { takeSurveyStub } from './stubs/take-survey.stub';
import { ShowResultDTO } from '../dtos/show-result.dto';
import { showResultStub } from './stubs/show-result.stub';
import { GetResultDTO } from '../dtos/get-result.dto';

// exposes mocks
jest.mock('../result.service.ts');

describe('ResultController', () => {
  let resultController: ResultController;
  let resultService: ResultService;

  beforeEach(async () => {
    /**
     * The compile() method is asynchronous and needs to be awaited
     * The compile() method mimics the behaviour of the main.ts file in that it bootstraps the components and returns a module that is ready for testing
     **/
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ResultController],
      providers: [ResultService],
    }).compile();

    /**
     * get<>() is used to retrieve a static instance of the instantiated components
     **/
    resultController = moduleRef.get<ResultController>(ResultController);
    resultService = moduleRef.get<ResultService>(ResultService);

    /**
     * resets all mock usage data between two different tests
     **/
    jest.clearAllMocks();
  });

  describe('addResultByTakingASurvey', () => {
    describe('* when addResultByTakingASurvey is called', () => {
      // this is the expected input
      let createResultDto: CreateResultDTO;
      //this is the expected output
      let result: CreateResultDTO;

      // takeSurveyStub() is a stub
      // stubs are used to define the structure of the data a function expects/returns and then returning those definitions
      beforeEach(async () => {
        createResultDto = {
          survey_id: takeSurveyStub().survey_id,
          answer_id: takeSurveyStub().answer_id,
        };

        /**
         * this version of addAResultByTakingASurvey() is actually the one we have defined in our _mocks_.
         * it is not a real function but is a "mock" that is for testing purposes alone
         * **/
        result = await resultController.addAResultByTakingASurvey(
          createResultDto,
        );
      });

      // here we verify that the function is called with expected arguments
      test('then it should call resultService', () => {
        expect(resultService.addAResultByTakingASurvey).toHaveBeenCalledWith(
          createResultDto,
        );
      });

      // here we verify that the function returns expected values
      test('then it should return a response/result data regarding the submitted survey', () => {
        expect(result).toEqual(takeSurveyStub());
      });
    });
  });

  describe('getResultsOfASurvey', () => {
    describe('* when getResultsOfASurvey is called', () => {
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

      test('then it should return the results of a given survey', () => {
        expect(result).toEqual(showResultStub());
      });
    });
  });
});

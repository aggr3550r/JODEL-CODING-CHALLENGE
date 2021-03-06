import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ResultService } from './result.service';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { AuthGuard } from '../../guards/auth.guard';
import { CreateResultDTO } from './dtos/create-result.dto';

@Controller('results')
@UseGuards(AuthGuard)
export class ResultController {
  constructor(private resultService: ResultService) {}

  @Post()
  @Serialize(CreateResultDTO)
  addAResultByTakingASurvey(@Body() body: CreateResultDTO) {
    return this.resultService.addAResultByTakingASurvey(body);
  }

  @Get()
  getResultsOfASurvey(@Query('survey_id') survey_id: string) {
    return this.resultService.getResultsOfASurvey(survey_id);
  }
}

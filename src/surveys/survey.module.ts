import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey, SurveySchema } from './schemas/survey.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Result, ResultSchema } from '../results/schemas/result.schema';
import { ResultController } from '../results/result.controller';
import { ResultService } from '../results/result.service';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Survey.name, schema: SurveySchema
  }, {name: Result.name, schema: ResultSchema}])],
  providers: [ResultService, SurveyService],
  controllers: [SurveyController, ResultController]
})
export class SurveyModule {}


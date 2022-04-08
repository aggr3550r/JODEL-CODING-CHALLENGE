import { Controller, Post, Body, Get, Param, Query, UseGuards } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { CreateSurveyDTO } from './dtos/create-survey.dto';
import { GetSurveyDTO } from './dtos/get-survey.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { ObjectID } from 'src/types/object-id.type';
const ObjectId = require('mongodb').ObjectID;

@Controller('surveys')
@UseGuards(AuthGuard)
export class SurveyController {
    constructor(private surveyService: SurveyService) {}

    
    @Post()
    @Serialize(CreateSurveyDTO)
    // Create a survey that consists of a question and multiple answers
    createSurvey(@Body() body: CreateSurveyDTO) {
       return this.surveyService.createSurvey(body.question, body.options);
    }

    @Get()
    @Serialize(GetSurveyDTO)
     getAllSurveys() {
         return this.surveyService.getAllSurveys();
     }

    @Get('/:id')
    @Serialize(GetSurveyDTO)
    getASurvey(@Param('id') id: ObjectID) {
        const survey = this.surveyService.findOne(ObjectId(id));
        return survey;
    }
}

import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { User } from 'src/users/schemas/user.schema'; 
import { SurveyService } from './survey.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateSurveyDTO } from './dtos/create-survey.dto';
import { SurveyDTO } from './dtos/survey.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import mongoose from 'mongoose';
import { GetSurveyDTO } from './dtos/get-survey.dto';
const ObjectId = require('mongodb').ObjectID;

@Controller('surveys')
export class SurveyController {
    constructor(private surveyService: SurveyService) {}

    
    @Post()
    @Serialize(SurveyDTO)
    // Create a survey that consists of a question and multiple answers
    createSurvey(@Body() body: CreateSurveyDTO) {
       return this.surveyService.create(body.question, body.options);
    }

    @Get()
    @Serialize(GetSurveyDTO)
     getAllSurveys() {
         return this.surveyService.getAllSurveys();
     }

    @Get('/:id')
    getASurvey(@Param('id') id: mongoose.Types.ObjectId) {
        const survey = this.surveyService.findOne(ObjectId(id));
        return survey;
    }
}

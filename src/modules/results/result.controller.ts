import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { ResultService } from "./result.service";
import { Serialize } from "../../interceptors/serialize.interceptor";
import { AuthGuard } from "../../guards/auth.guard";
import { CreateResultDTO } from "./dtos/create-result.dto";
import { ObjectID } from "src/types/object-id.type";


@Controller('results')
@UseGuards(AuthGuard)
export class ResultController {
    constructor(private resultService: ResultService) {}

    @Post()
    @Serialize(CreateResultDTO)
    takeSurvey(@Body() body: CreateResultDTO) {
        return this.resultService.addAResultByTakingASurvey(body.survey_id, body.answer_id);
    }

    @Get()
    getResultsOfASurvey(@Query('survey_id') survey_id: string) {
        return this.resultService.getResultsOfASurvey(survey_id);
    }

    @Get('new-function') 
    newGetResultsOfASurvey(@Query('survey_id') survey_id: ObjectID) {
        return this.resultService.newGetResultsOfASurvey(survey_id);
    }

}
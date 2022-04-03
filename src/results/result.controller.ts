import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ResultService } from "./result.service";
import { Serialize } from "../interceptors/serialize.interceptor";
import { AuthGuard } from "../guards/auth.guard";
import { CreateResultDTO } from "./dtos/create-result.dto";
import { ResultDTO } from "./dtos/result.dto";

@Controller('results')
@UseGuards(AuthGuard)
export class ResultController {
    constructor(private resultService: ResultService) {}

    @Post()
    @Serialize(ResultDTO)
    takeSurvey(@Body() body: CreateResultDTO) {
        return this.resultService.takeSurvey(body.survey_id, body.answer_id);
    }

    @Get('/:id')
    getResultsOfASurvey(@Param('id') id: string) {
        return this.resultService.getResultsOfASurvey(id);
    }

}
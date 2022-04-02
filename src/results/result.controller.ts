import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ResultService } from "./result.service";
import { CreateResponseDTO } from "./dtos/create-result.dto";
import { Serialize } from "src/interceptors/serialize.interceptor";
import { ResultDTO } from "./dtos/result.dto";

@Controller('results')
export class ResultController {
    constructor(private resultService: ResultService) {}

    @Post()
    @Serialize(ResultDTO)
    takeSurvey(@Body() body: CreateResponseDTO) {
        return this.resultService.takeSurvey(body.survey_id, body.answer_id);
    }

    @Get('/:id')
    getResultsOfASurvey(@Param('id') id: string) {
        return this.resultService.getResultsOfASurvey(id);
    }




    // @Get('/idMapper')
    // idMapper() {
    //     return this.resultService.idMapper("6245f88cd8148670691f8e5b", 1);
    // }
}
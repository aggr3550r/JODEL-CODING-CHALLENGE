import { CreateResultDTO } from "src/results/dtos/create-result.dto"
import { Result } from "src/results/schemas/result.schema"


export const takeSurveyStub = (): CreateResultDTO => {
    return {
        survey_id: "6245f88cd8148670691f8e5b",
        answer_id: 2
    }
}
import { ShowResultDTO } from "src/modules/results/dtos/show-result.dto";


export const showResultStub = (): ShowResultDTO => {
    return {
        question: "What is your favourite colour",
        answers_so_far: ["Blue", "Red"]
    }
}
import { Survey } from "src/surveys/schemas/survey.schema";

export const surveyStub = (): Survey => {
    return {
  question: "What is your favourite colour?",
  options: [
    {
      "id": 1,
      "option": "Red"
    }, 
    {
      "id": 1,
      "option": "Red"
    },
    {
      "id": 2,
      "option": "Blue"
    }
  ]
    }
}
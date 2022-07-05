import { ShowResultDTO } from 'src/modules/results/dtos/show-result.dto';

export const showResultStub = (): ShowResultDTO => {
  let question = 'What is your favourite color';
  let frequency_counter = {};
  return {
    question,
    frequency_counter,
  };
};

export type TQuestion = {
  id: number;
  question: string;
  answers: string[];
  correct: number;
};

export interface QuestionCardState {
  isLoading: boolean;
  isError: boolean;
  isTimeOut: boolean;
  timer: number;
  questions: TQuestion[];
  questionNum: number;
  userAnswer: object;
  allUserAnswers: object;
}

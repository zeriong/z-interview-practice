export interface InterviewChild {
  question: string;
  answer: string;
}

export interface InterviewItem {
  question: string;
  answer: string;
  children: InterviewChild[];
}

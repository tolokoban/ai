export interface DataDiscussion {}

export interface DataPrompt {
  date: number; // Number of seconds since Epoc in UTC
  question: {
    content: string;
  };
  answer: {
    content: string;
  };
}

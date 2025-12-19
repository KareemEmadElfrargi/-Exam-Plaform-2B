export interface Question {
    id: number;
    text: string;
    options: string[];
    correctAnswer: number; // index of correct option
    code?: string; // Optional code snippet
}

export interface UserState {
    name: string;
    governorate: string;
    mobile: string;
    gender: 'male' | 'female';
}

export interface ExamState {
    answers: Record<number, number>; // questionId -> selectedOptionIndex
    isFinished: boolean;
    score: number;
}

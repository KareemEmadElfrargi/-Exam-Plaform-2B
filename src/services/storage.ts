import { UserState } from '../types';

export interface ExamResult extends UserState {
    score: number;
    total: number;
    date: string;
}

const STORAGE_KEY = 'exam_results';

export const saveExamResult = (result: ExamResult) => {
    const existing = getExamResults();
    const updated = [...existing, result];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const getExamResults = (): ExamResult[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    try {
        return JSON.parse(stored);
    } catch {
        return [];
    }
};

export const clearExamResults = () => {
    localStorage.removeItem(STORAGE_KEY);
};

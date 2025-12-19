import React from 'react';
import { Question } from '../types';

interface QuestionCardProps {
    question: Question;
    selectedOption: number | undefined;
    onSelectOption: (optionIndex: number) => void;
    questionNumber: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
    question,
    selectedOption,
    onSelectOption,
    questionNumber,
    totalQuestions
}) => {
    return (
        <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '800px', margin: '2rem auto' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                borderBottom: '1px solid var(--border)',
                paddingBottom: '1rem'
            }}>
                <span style={{
                    background: 'rgba(88, 166, 255, 0.1)',
                    color: 'var(--primary)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.875rem',
                    fontWeight: 600
                }}>
                    سؤال {questionNumber.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)])} من {totalQuestions.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)])}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                        width: '20px',
                        height: '20px',
                        background: '#f7df1e',
                        borderRadius: '3px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 0
                    }}>
                        <span style={{ color: '#000', fontWeight: 'bold', fontSize: '10px', lineHeight: '1', fontFamily: 'sans-serif' }}>JS</span>
                    </div>
                    <span style={{ color: '#f7df1e', fontWeight: 'bold', fontSize: '0.9rem' }}>
                        JavaScript
                    </span>
                </div>
            </div>

            <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                {question.text}
            </h2>

            {question.code && (
                <div style={{
                    direction: 'ltr',
                    background: '#1e1e1e',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    marginBottom: '2rem',
                    border: '1px solid var(--border)',
                    overflowX: 'auto',
                    fontFamily: 'monospace',
                    fontSize: '1rem',
                    color: '#d4d4d4',
                    textAlign: 'left'
                }}>
                    <pre style={{ margin: 0 }}>
                        <code>{question.code}</code>
                    </pre>
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => onSelectOption(index)}
                        className="btn"
                        style={{
                            justifyContent: 'flex-start',
                            background: selectedOption === index
                                ? 'rgba(88, 166, 255, 0.15)'
                                : 'transparent',
                            border: selectedOption === index
                                ? '2px solid var(--primary)'
                                : '2px solid var(--border)',
                            color: selectedOption === index ? 'var(--primary)' : 'var(--text-main)',
                            width: '100%',
                            padding: '1.25rem',
                            fontSize: '1.1rem',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <span style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: selectedOption === index ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                            color: selectedOption === index ? 'white' : 'var(--text-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: '1rem',
                            fontSize: '0.9rem',
                            fontWeight: 'bold'
                        }}>
                            {String.fromCharCode(65 + index)}
                        </span>
                        <span style={{ direction: 'ltr', textAlign: 'left' }}>{option}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuestionCard;

import React from 'react';
import { UserState } from '../types';
import { XCircle, RefreshCw, Trophy } from 'lucide-react';

interface ResultScreenProps {
    score: number;
    totalQuestions: number;
    user: UserState;
    onRetry: () => void;
    incorrectQuestions?: number[];
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, totalQuestions, user, onRetry, incorrectQuestions = [] }) => {
    const percentage = Math.round((score / totalQuestions) * 100);
    const isPassed = percentage >= 50;

    const toArabicNum = (num: number) => {
        return num.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);
    };

    const getGrade = (pct: number) => {
        if (pct >= 85) return 'امتياز';
        if (pct >= 75) return 'جيد جداً';
        if (pct >= 65) return 'جيد';
        if (pct >= 50) return 'مقبول';
        return 'ضعيف';
    };

    const grade = getGrade(percentage);

    return (
        <div className="container flex-center" style={{ minHeight: '100vh', padding: '2rem' }}>
            <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}>
                <div style={{ marginBottom: '2rem' }}>
                    {isPassed ? (
                        <div className="floating-icon" style={{
                            width: '120px',
                            height: '120px',
                            background: 'rgba(35, 134, 54, 0.1)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                        }}>
                            <Trophy size={60} color="var(--success)" />
                        </div>
                    ) : (
                        <div style={{
                            width: '120px',
                            height: '120px',
                            background: 'rgba(218, 54, 51, 0.1)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                        }}>
                            <XCircle size={60} color="var(--danger)" />
                        </div>
                    )}

                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                        {isPassed ? `مبروك يا ${user.name.split(' ')[0]}!` : `حظ أوفر يا ${user.name.split(' ')[0]}!`}
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: isPassed ? 'var(--success)' : 'var(--danger)', fontWeight: 'bold' }}>
                        التقدير: {grade}
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    marginBottom: '2rem'
                }}>
                    <div style={{
                        background: 'rgba(255,255,255,0.03)',
                        padding: '1.5rem',
                        borderRadius: '12px',
                        border: '1px solid var(--border)'
                    }}>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>النسبة المئوية</p>
                        <p style={{ fontSize: '2rem', fontWeight: 'bold', color: isPassed ? 'var(--success)' : 'var(--danger)', margin: 0 }}>
                            {toArabicNum(percentage)}%
                        </p>
                    </div>
                    <div style={{
                        background: 'rgba(255,255,255,0.03)',
                        padding: '1.5rem',
                        borderRadius: '12px',
                        border: '1px solid var(--border)'
                    }}>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>الدرجة</p>
                        <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>
                            {toArabicNum(score)} / {toArabicNum(totalQuestions)}
                        </p>
                    </div>
                </div>

                {incorrectQuestions.length > 0 && (
                    <div style={{
                        padding: '1rem',
                        background: 'rgba(218, 54, 51, 0.05)',
                        border: '1px solid rgba(218, 54, 51, 0.2)',
                        borderRadius: '12px',
                        marginBottom: '2rem',
                        textAlign: 'right'
                    }}>
                        <p style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--danger)' }}>
                            أسئلة تمت الإجابة عليها بشكل خاطئ:
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {incorrectQuestions.map((num) => (
                                <span key={num} style={{
                                    background: 'var(--bg-card)',
                                    padding: '0.2rem 0.8rem',
                                    borderRadius: '20px',
                                    fontSize: '0.9rem',
                                    border: '1px solid var(--border)',
                                    color: 'var(--text-primary)'
                                }}>
                                    سؤال {toArabicNum(num)}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div style={{
                    padding: '1rem',
                    background: isPassed ? 'rgba(35, 134, 54, 0.1)' : 'rgba(218, 54, 51, 0.1)',
                    borderRadius: '8px',
                    color: isPassed ? 'var(--success)' : 'var(--danger)',
                    marginBottom: '2rem'
                }}>
                    {isPassed
                        ? (user.gender === 'female' ? 'أداء ممتاز! لقد اجتزتِ الاختبار بنجاح.' : 'أداء ممتاز! لقد اجتزت الاختبار بنجاح.')
                        : (user.gender === 'female' ? 'للأسف لم تجتزي الاختبار هذه المرة. حاولي مرة أخرى!' : 'للأسف لم تجتز الاختبار هذه المرة. حاول مرة أخرى!')}
                </div>

                <button onClick={onRetry} className="btn btn-primary" style={{ width: '100%' }}>
                    <RefreshCw size={20} />
                    إعادة الاختبار
                </button>
            </div>
        </div>
    );
};

export default ResultScreen;

import React, { useState, useEffect } from 'react';
import { Question, UserState } from '../types';
import QuestionCard from '../components/QuestionCard';
import ResultScreen from '../components/ResultScreen';
import { Timer, ArrowRight, ArrowLeft, CheckSquare, Sun, Moon } from 'lucide-react';
import { saveExamResult } from '../services/storage';
import { submitToGoogleSheet } from '../services/googleSheets';
import CodeEditor from '../components/CodeEditor';
import '../Watermark.css';

interface ExamPageProps {
    questions: Question[];
    user: UserState;
    onRetry: () => void;
}

const TOTAL_TIME = 60 * 60; // 60 minutes in seconds

const ExamPage: React.FC<ExamPageProps> = ({ questions, user, onRetry }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
    const [isFinished, setIsFinished] = useState(false);
    const [watermarkPos, setWatermarkPos] = useState({ top: '10%', left: '10%' });
    const [showWatermark, setShowWatermark] = useState(false);
    const [isBlur, setIsBlur] = useState(false);
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');

    // Theme Effect
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // Anti-Cheating: Blur on focus loss
    useEffect(() => {
        const handleFocus = () => setIsBlur(false);
        const handleBlur = () => setIsBlur(true);
        const handleVisibilityChange = () => {
            if (document.hidden) setIsBlur(true);
            else setIsBlur(false);
        };

        window.addEventListener('focus', handleFocus);
        window.addEventListener('blur', handleBlur);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('blur', handleBlur);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    // Anti-Cheating: Prevent Screenshot Keys
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'PrintScreen' || (e.ctrlKey && e.key === 'p') || (e.metaKey && e.shiftKey)) {
                e.preventDefault();
                alert('غير مسموح بأخذ لقطات شاشة!');
                setIsBlur(true);
                setTimeout(() => setIsBlur(false), 2000); // Penalty blur
            }
        };
        const handleContextMenu = (e: MouseEvent) => e.preventDefault();

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('contextmenu', handleContextMenu);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

    useEffect(() => {
        const moveAndShow = () => {
            // 1. Hide first (if visible)
            setShowWatermark(false);

            // 2. Wait for fade out (500ms), then move and show
            setTimeout(() => {
                const top = Math.random() * 80 + 10 + '%';
                const left = Math.random() * 80 + 10 + '%';
                setWatermarkPos({ top, left });
                setShowWatermark(true);
            }, 500);
        };

        moveAndShow(); // Initial run

        // Cycle: 3 seconds visible + 1 second transition/hidden time
        const interval = setInterval(moveAndShow, 3500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (isFinished) return;

        // Play warning sound at exactly 5 minutes (300 seconds)
        if (timeLeft === 300) {
            const audio = new Audio('https://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3'); // Simple alert sound
            audio.play().catch(e => console.log('Audio play failed', e));
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    finishExam();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isFinished, timeLeft]);

    const handleSelectOption = (optionIndex: number) => {
        setAnswers((prev) => ({
            ...prev,
            [questions[currentQuestionIndex].id]: optionIndex
        }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    };

    const calculateScore = () => {
        let score = 0;
        questions.forEach((q) => {
            if (answers[q.id] === q.correctAnswer) {
                score++;
            }
        });
        return score;
    };

    const finishExam = () => {
        const score = calculateScore();
        const result = {
            name: user.name,
            governorate: user.governorate,
            mobile: user.mobile,
            gender: user.gender,
            score,
            total: questions.length,
            date: new Date().toLocaleString('ar-EG')
        };

        saveExamResult(result);
        submitToGoogleSheet(result);

        setIsFinished(true);
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        return timeString.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);
    };

    if (isFinished) {
        const incorrectQuestions = questions
            .map((q, index) => (answers[q.id] !== q.correctAnswer ? index + 1 : null))
            .filter((num): num is number => num !== null);

        return (
            <ResultScreen
                score={calculateScore()}
                totalQuestions={questions.length}
                user={user}
                onRetry={onRetry}
                incorrectQuestions={incorrectQuestions}
            />
        );
    }

    const isLowTime = timeLeft <= 300;
    const answeredCount = Object.keys(answers).length;
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
        <>
            {isBlur && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: 99999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0,0,0,0.85)', // Slightly darker background for better contrast
                    color: '#ff4444',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    pointerEvents: 'auto' // Must catch events
                }}>
                    ⛔ تحذير! <br /> من فضلك لا تغادر صفحة الاختبار!
                </div>
            )}
            <div className="container" style={{
                padding: '2rem 1rem',
                paddingBottom: '100px',
                filter: isBlur ? 'blur(15px)' : 'none',
                transition: 'filter 0.3s',
                pointerEvents: isBlur ? 'none' : 'auto'
            }}>


                {/* Header */}
                {/* Header */}
                <header
                    className="exam-header"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '2rem',
                        background: 'var(--bg-card)',
                        padding: '1rem',
                        borderRadius: '12px',
                        border: isLowTime ? '1px solid var(--danger)' : '1px solid var(--border)',
                        boxShadow: isLowTime ? '0 0 10px rgba(218, 54, 51, 0.3)' : 'none',
                        transition: 'all 0.3s ease'
                    }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        position: 'relative',
                        overflow: 'hidden',
                        padding: '0.5rem 1rem',
                        borderRadius: '12px',
                        // background: 'var(--bg-hover)', // Fallback
                        // border: isLowTime ? '1px solid var(--danger)' : '1px solid var(--border)', // Removed to use class
                        // boxShadow: isLowTime ? '0 0 10px rgba(218, 54, 51, 0.3)' : 'none', // Removed to use class
                        transition: 'all 0.3s ease'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            right: 0, // RTL
                            bottom: 0,
                            width: `${((TOTAL_TIME - timeLeft) / TOTAL_TIME) * 100}%`,
                            background: isLowTime ? 'rgba(218, 54, 51, 0.2)' : 'linear-gradient(90deg, #05f8fd, #6981f7, #b428f1)',
                            opacity: 0.2,
                            transition: 'width 1s linear',
                            zIndex: 0
                        }} />

                        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                                background: isLowTime ? 'rgba(218, 54, 51, 0.2)' : 'rgba(88, 166, 255, 0.1)',
                                padding: '0.5rem',
                                borderRadius: '8px',
                                color: isLowTime ? 'var(--danger)' : 'var(--primary)',
                                transition: 'all 0.3s ease'
                            }}>
                                <Timer size={24} />
                            </div>
                            <div>
                                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>الوقت المتبقي</p>
                                <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.25rem', color: isLowTime ? 'var(--danger)' : 'inherit' }}>{formatTime(timeLeft)}</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
                            className="btn"
                            style={{
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border)',
                                color: 'var(--primary)',
                                padding: '0.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>

                    <div className="exam-header-title" style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '1.5rem', fontWeight: 'bold' }}>
                        هذا الاختبار مقدم من <span style={{ color: 'var(--primary)' }}>2B School</span>
                    </div>

                    <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <p style={{ margin: 0, color: 'var(--text-muted)' }}>{user.gender === 'female' ? 'الطالبة :' : 'الطالب :'}</p>
                            <p style={{ margin: 0, fontWeight: 'bold' }}>{user.name}</p>
                        </div>
                        <CodeEditor />
                    </div>
                </header>

                {/* Floating Watermark */}
                <div
                    style={{
                        position: 'fixed',
                        top: watermarkPos.top,
                        left: watermarkPos.left,
                        opacity: showWatermark ? 0.5 : 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                        zIndex: 9999,
                        color:
                            theme === 'dark'
                                ? 'rgba(255, 255, 255, 0.6)'
                                : 'rgba(0, 0, 0, 0.4)',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        transition: 'opacity 0.5s ease-in-out',
                        textShadow: '0 0 10px rgba(0,0,0,0.5)',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {user.mobile || '01234567890'}
                </div>


                {/* Progress Bar */}
                <div style={{
                    width: '100%',
                    height: '6px',
                    background: 'var(--bg-card)',
                    borderRadius: '3px',
                    marginBottom: '2rem',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                        width: `${progress}%`,
                        transition: 'width 0.3s ease'
                    }} />
                </div>

                <QuestionCard
                    question={questions[currentQuestionIndex]}
                    selectedOption={answers[questions[currentQuestionIndex].id]}
                    onSelectOption={handleSelectOption}
                    questionNumber={currentQuestionIndex + 1}
                    totalQuestions={questions.length}
                />

                {/* Footer Navigation */}
                <div className="footer-nav" style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'var(--bg-card)',
                    borderTop: '1px solid var(--border)',
                    padding: '1rem',
                    zIndex: 100
                }}>
                    <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={handleNext}
                                disabled={currentQuestionIndex === questions.length - 1}
                                className="btn btn-outline"
                                style={{ opacity: currentQuestionIndex === questions.length - 1 ? 0.5 : 1 }}
                            >
                                <ArrowRight size={18} />
                                التالي
                            </button>
                            <button
                                onClick={handlePrev}
                                disabled={currentQuestionIndex === 0}
                                className="btn btn-outline"
                                style={{ opacity: currentQuestionIndex === 0 ? 0.5 : 1 }}
                            >
                                السابق
                                <ArrowLeft size={18} />
                            </button>
                        </div>

                        <button
                            onClick={finishExam}
                            disabled={answeredCount < questions.length}
                            className="btn btn-primary"
                            style={{
                                paddingLeft: '2rem',
                                paddingRight: '2rem',
                                opacity: answeredCount < questions.length ? 0.5 : 1,
                                cursor: answeredCount < questions.length ? 'not-allowed' : 'pointer',
                                background: answeredCount < questions.length ? 'var(--bg-hover)' : undefined,
                                border: answeredCount < questions.length ? '1px solid var(--border)' : undefined,
                                color: answeredCount < questions.length ? 'var(--text-muted)' : undefined
                            }}
                        >
                            <CheckSquare size={18} />
                            {answeredCount < questions.length ? `باقي ${questions.length - answeredCount} أسئلة` : 'إنهاء الاختبار'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ExamPage;

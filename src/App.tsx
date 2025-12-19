import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import ExamPage from './pages/ExamPage';
import { questions } from './data/questions';
import { UserState } from './types';

function App() {
    const [user, setUser] = useState<UserState | null>(null);

    const handleStart = (userData: UserState) => {
        setUser(userData);
    };

    const handleRetry = () => {
        setUser(null);
    };

    return (
        <div className="app">
            {!user ? (
                <StartScreen onStart={handleStart} />
            ) : (
                <ExamPage
                    questions={questions}
                    user={user}
                    onRetry={handleRetry}
                />
            )}
        </div>
    );
}

export default App;

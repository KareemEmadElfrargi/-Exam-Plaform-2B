import React, { useState } from 'react';
import { UserState } from '../types';
import { GOVERNORATES } from '../data/questions';
import { MapPin, ArrowLeft, Phone, User, MessageCircle, ShieldCheck } from 'lucide-react';

interface StartScreenProps {
    onStart: (user: UserState) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
    const [name, setName] = useState('');
    const [governorate, setGovernorate] = useState('');
    const [mobile, setMobile] = useState('');
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [error, setError] = useState('');

    // OTP State
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [enteredOtp, setEnteredOtp] = useState('');
    const [smsMessage, setSmsMessage] = useState('');

    const handleSendOtp = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!name || !governorate || !mobile) {
            setError('من فضلك أكمل جميع البيانات أولاً');
            return;
        }

        if (mobile.length !== 11) {
            setError('رقم الموبايل يجب أن يكون 11 رقم');
            return;
        }

        if (!/^(010|011|012|015)/.test(mobile)) {
            setError('رقم الموبايل يجب أن يبدأ بـ 010 أو 011 أو 012 أو 015');
            return;
        }

        // Simulate sending OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        setGeneratedOtp(otp);
        setShowOtpInput(true);

        // Simulate SMS delay
        setTimeout(() => {
            setSmsMessage(`💬 2B School: رمز التحقق الخاص بك هو ${otp}`);
            // Hide notification after 6 seconds
            setTimeout(() => setSmsMessage(''), 6000);
        }, 1500);
    };

    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault();

        if (enteredOtp === generatedOtp) {
            onStart({ name, governorate, mobile, gender });
        } else {
            setError('عفواً، رمز التحقق غير صحيح');
        }
    };



    return (

        <div className="animated-gradient-bg" style={{
            minHeight: '100vh',
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0
        }}>
            <div className="container flex-center" style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>

                {/* Simulated SMS Notification */}
                {smsMessage && (
                    <div className="animate-fade-in" style={{
                        position: 'fixed',
                        top: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(22, 27, 34, 0.95)',
                        border: '1px solid var(--primary)',
                        padding: '1rem 2rem',
                        borderRadius: '50px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                        zIndex: 2000,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        backdropFilter: 'blur(10px)',
                        minWidth: '300px',
                        justifyContent: 'center'
                    }}>
                        <div style={{ background: 'var(--primary)', borderRadius: '50%', padding: '0.5rem', display: 'flex' }}>
                            <MessageCircle size={24} color="white" />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>الرسائل - الآن</span>
                            <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'white' }}>{smsMessage.split('هو')[1]}</span>
                        </div>
                    </div>
                )}

                <div className="card animate-fade-in" style={{
                    width: '100%',
                    maxWidth: '600px',
                    backdropFilter: 'blur(10px)',
                    background: 'rgba(22, 27, 34, 0.8)',
                    padding: '1.5rem',
                    boxSizing: 'border-box', // Ensure padding doesn't affect width
                    margin: '1rem', // Add margin for small screens
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div className="floating-icon" style={{
                            width: '450px',
                            height: '100px',
                            margin: '0 auto',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <img src="/logo.png" alt="2B School Logo" style={{ maxWidth: '100%', height: 'auto', maxHeight: '50px', objectFit: 'contain' }} />
                        </div>
                        <h1 style={{ margin: 0, fontSize: '1.75rem' }}>أهلا بك في 2B School</h1>
                        <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 0' }}>
                            أدخل بياناتك للبدء في <span style={{ color: 'var(--primary)' }}>الاختبار التجريبي</span> للصف الاول الثانوي
                        </p>
                        <p style={{ color: 'var(--secondary)', margin: '0', fontSize: '0.9rem', fontWeight: 'bold' }}>
                            (امتحان توفاس - الأول - ٢٠٢٥)
                        </p>
                    </div>

                    <form onSubmit={showOtpInput ? handleVerifyOtp : handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <User size={18} color="var(--primary)" />
                                اسم الطالب
                            </label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder=" اكتب اسمك ثلاثي باللغة العربية"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('من فضلك أدخل اسمك الثلاثي')}
                                onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                            />
                        </div>

                        <div>
                            <label style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <User size={18} color="var(--primary)" />
                                النوع
                            </label>
                            <div style={{ display: 'flex', gap: '2rem', padding: '0.5rem 0' }}>
                                <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        checked={gender === 'male'}
                                        onChange={() => setGender('male')}
                                        style={{ accentColor: 'var(--primary)', width: '1.2rem', height: '1.2rem' }}
                                    />
                                    ذكر
                                </label>
                                <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        checked={gender === 'female'}
                                        onChange={() => setGender('female')}
                                        style={{ accentColor: 'var(--primary)', width: '1.2rem', height: '1.2rem' }}
                                    />
                                    أنثى
                                </label>
                            </div>
                        </div>

                        <div>
                            <label style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Phone size={18} color="var(--primary)" />
                                رقم الموبايل
                            </label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="01xxxxxxxxx"
                                value={mobile}
                                required
                                onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('من فضلك أدخل رقم الموبايل')}
                                onInput={(e) => {
                                    const val = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 11);
                                    setMobile(val);
                                    (e.target as HTMLInputElement).setCustomValidity('');
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MapPin size={18} color="var(--primary)" />
                                المحافظة
                            </label>
                            <select
                                className="input-field"
                                value={governorate}
                                onChange={(e) => setGovernorate(e.target.value)}
                                required
                                onInvalid={(e) => (e.target as HTMLSelectElement).setCustomValidity('من فضلك اختر المحافظة')}
                                onInput={(e) => (e.target as HTMLSelectElement).setCustomValidity('')}
                            >
                                <option value="" disabled>اختر المحافظة</option>
                                {GOVERNORATES.map((gov) => (
                                    <option key={gov} value={gov}>{gov}</option>
                                ))}
                            </select>
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '-0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <a
                                    href="https://wa.me/201015647267"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ display: 'flex', alignItems: 'center', color: '#25D366' }}
                                    title="تواصل عبر واتساب"
                                >
                                    <MessageCircle size={20} fill="#25D366" color="#ffffff" style={{ background: '#25D366', borderRadius: '50%', padding: '2px' }} />
                                </a>
                                <p style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 600, margin: 0 }}>
                                    تحت إشراف المهندس كريم عماد
                                </p>
                            </div>
                            {error && <p style={{ color: 'var(--danger)', fontSize: '0.9rem', marginTop: '0.5rem' }}>{error}</p>}
                        </div>

                        {showOtpInput && (
                            <div className="animate-fade-in">
                                <label style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <ShieldCheck size={18} color="var(--primary)" />
                                    رمز التحقق (OTP)
                                </label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="أدخل الرمز المكون من 4 أرقام"
                                    value={enteredOtp}
                                    onChange={(e) => setEnteredOtp(e.target.value)}
                                    maxLength={4}
                                    style={{ letterSpacing: '0.5rem', textAlign: 'center', fontWeight: 'bold' }}
                                    autoFocus
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ marginTop: '1rem', width: '100%' }}
                        >
                            {showOtpInput ? 'تحقق وبدء الاختبار' : 'إرسال رمز التحقق (محاكاة)'}
                            {showOtpInput ? <ArrowLeft size={20} /> : <ShieldCheck size={20} />}
                        </button>
                        {!showOtpInput && (
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', margin: '0.5rem 0 0' }}>
                                ملحوظة: سيظهر رمز التحقق في إشعار بالأعلى (تجريبي).
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StartScreen;

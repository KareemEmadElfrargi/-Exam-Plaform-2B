import React, { useState } from 'react';
import { Play, Terminal, Trash2, Code, X } from 'lucide-react';

const CodeEditor: React.FC = () => {
    const [code, setCode] = useState('console.log("Welcome to 2B School");\n');
    const [output, setOutput] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isDark, setIsDark] = useState(true);

    React.useEffect(() => {
        const checkTheme = () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            setIsDark(currentTheme !== 'light');
        };
        
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        
        return () => observer.disconnect();
    }, []);

    const runCode = () => {
        const logs: string[] = [];
        const originalLog = console.log;

        // Capture console.log
        console.log = (...args) => {
            logs.push(args.map(arg =>
                typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
            ).join(' '));
        };

        try {
            // eslint-disable-next-line no-new-func
            new Function(code)();
        } catch (error: any) {
            logs.push(`Error: ${error.message}`);
        } finally {
            console.log = originalLog;
            setOutput(logs.length > 0 ? logs : ['(No Output)']);
        }
    };

    const clearConsole = () => {
        setOutput([]);
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="btn"
                style={{
                    background: 'var(--bg-card)',
                    border: '1px solid #f7df1e',
                    borderRadius: '8px',
                    padding: '0.25rem 0.75rem',
                    color: 'var(--primary)',
                    fontSize: '0.8rem',
                    marginTop: '0.25rem'
                }}
            >
                <Code size={16} style={{ marginLeft: '0.5rem' }} />
                جرب الكود
            </button>
        );
    }

    return (
        <>
            <button
                className="btn"
                style={{
                    background: 'var(--bg-card)',
                    border: '1px solid #f7df1e',
                    borderRadius: '8px',
                    padding: '0.25rem 0.75rem',
                    color: 'var(--primary)',
                    fontSize: '0.8rem',
                    marginTop: '0.25rem',
                    opacity: 0.5,
                    cursor: 'default'
                }}
            >
                <Code size={16} style={{ marginLeft: '0.5rem' }} />
                جرب الكود (مفتوح)
            </button>

            {/* Overlay Container - Rendered with fixed positioning */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.5)',
                zIndex: 99,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }} onClick={() => setIsOpen(false)}>

                {/* Editor Window */}
                <div onClick={(e) => e.stopPropagation()} className="animate-fade-in" style={{
                    width: '90%',
                    maxWidth: '600px',
                    zIndex: 100,
                    background: '#0d1117',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid #30363d',
                    direction: 'ltr', // Code is LTR
                    textAlign: 'left',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                }}>
                    {/* Toolbar */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.75rem 1rem',
                        background: '#161b22',
                        borderBottom: '1px solid #30363d'
                    }} dir="rtl">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }}>
                            <Code size={18} color="var(--primary)" />
                            <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>يمكنك تجربة كودك هنا</span>

                            <div style={{ width: '1px', height: '16px', background: '#30363d', margin: '0 0.25rem' }}></div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                <div style={{
                                    width: '18px',
                                    height: '18px',
                                    background: '#f7df1e',
                                    borderRadius: '3px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 0
                                }}>
                                    <span style={{ color: '#000', fontWeight: 'bold', fontSize: '10px', lineHeight: '1', fontFamily: 'sans-serif' }}>JS</span>
                                </div>
                                <span style={{ color: '#f7df1e', fontWeight: '600', fontSize: '0.85rem' }}>JavaScript</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                                onClick={() => setIsOpen(false)}
                                style={{ background: 'none', border: 'none', color: '#bbb', cursor: 'pointer', fontSize: '0.8rem' }}
                            >
                                <X size={20} color="var(--danger)" strokeWidth={3} />
                            </button>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0', background: isDark ? '#0d1117' : '#ffffff' }}>
                        {/* Editor with Line Numbers */}
                        <div
                            style={{
                                flex: 1,
                                position: 'relative',
                                height: '250px',
                                background: isDark ? '#0d1117' : '#ffffff',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Highlighting Layer */}
                            <pre
                                id="code-highlight"
                                aria-hidden="true"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    margin: 0,
                                    padding: '1rem',
                                    fontFamily: 'monospace',
                                    fontSize: '14px',
                                    lineHeight: '1.5',
                                    whiteSpace: 'pre',
                                    pointerEvents: 'none',
                                    color: isDark ? '#c9d1d9' : '#24292f',
                                    overflow: 'hidden',
                                    textAlign: 'left',
                                    direction: 'ltr'
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: code
                                        .replace(/&/g, "&amp;")
                                        .replace(/</g, "&lt;")
                                        .replace(/>/g, "&gt;")
                                        .replace(/(".*?"|'.*?')/g, '<span style="color: #a5d6ff">$1</span>') // Strings
                                        .replace(/(\b)(const|let|var|function|return|if|else|for|while|console|true|false|null|undefined|async|await|import|export|from)(\b)/g, '$1<span style="color: #ff7b72">$2</span>$3') // Keywords
                                        .replace(/(\/\/.*)/g, '<span style="color: #8b949e">$1</span>') // Comments
                                        .replace(/\b(\w+)(?=\()/g, '<span style="color: #d2a8ff">$1</span>') // Functions
                                        .replace(/\b(\d+)\b/g, '<span style="color: #79c0ff">$1</span>') // Numbers
                                        + '<br/>' // Extra line for scrolling sync
                                }}
                            />

                            <textarea
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                onScroll={(e) => {
                                    const highlight = document.getElementById('code-highlight');
                                    if (highlight) {
                                        highlight.scrollTop = e.currentTarget.scrollTop;
                                        highlight.scrollLeft = e.currentTarget.scrollLeft;
                                    }
                                }}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: 'transparent',
                                    color: 'transparent',
                                    caretColor: '#c9d1d9',
                                    border: 'none',
                                    padding: '1rem',
                                    fontFamily: 'monospace',
                                    fontSize: '14px',
                                    resize: 'none',
                                    outline: 'none',
                                    lineHeight: '1.5',
                                    whiteSpace: 'pre',
                                    overflow: 'auto',
                                    textAlign: 'left',
                                    direction: 'ltr'
                                }}
                                spellCheck={false}
                            />

                            <button
                                onClick={runCode}
                                style={{
                                    position: 'absolute',
                                    bottom: '1rem',
                                    right: '1rem',
                                    background: 'var(--success)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                                    zIndex: 10
                                }}
                                title="Run Code"
                            >
                                <Play size={20} fill="white" />
                            </button>
                        </div>

                        {/* Console */}
                        <div style={{ background: isDark ? '#0a0c10' : '#f6f8fa', padding: '1rem', height: '150px', overflowY: 'auto', borderTop: isDark ? 'none' : '1px solid #d0d7de' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', borderBottom: '1px solid #333', paddingBottom: '0.25rem' }}>
                                <span style={{ color: '#8b949e', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <Terminal size={14} /> Console
                                </span>
                                <button onClick={clearConsole} style={{ background: 'none', border: 'none', color: '#8b949e', cursor: 'pointer' }}>
                                    <Trash2 size={14} />
                                </button>
                            </div>
                            {output.map((line, i) => (
                                <div key={i} style={{
                                    color: line.startsWith('Error:') ? '#f14c4c' : (isDark ? '#cccccc' : '#24292f'),
                                    fontFamily: 'monospace',
                                    fontSize: '13px',
                                    marginBottom: '0.25rem',
                                    whiteSpace: 'pre-wrap'
                                }}>
                                    {line.startsWith('Error:') ? line : `> ${line}`}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CodeEditor;

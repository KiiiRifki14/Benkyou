import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Volume2, XCircle, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

// Utility Validation
export const validateUserAnswer = (userAns: string, correctAns: string | string[] | null): boolean => {
    if (!userAns || !correctAns) return false;

    const normalize = (text: string): string => text.trim().toLowerCase();

    // Jika kunci jawaban bertipe array (typing multi-alias)
    if (Array.isArray(correctAns)) {
        return correctAns.some(ans => normalize(ans) === normalize(userAns));
    }

    // Jika kunci jawaban bertipe string tunggal
    return normalize(String(correctAns)) === normalize(userAns);
};

const QuestionRenderer = ({ question, currentValue, onAnswer }) => {
    switch(question.question_type) {
        case 'multiple-choice':
        case 'pg':
            return (
                <div className="space-y-3">
                    {question.options.map((opt, idx) => (
                        <button 
                            key={idx}
                            onClick={() => onAnswer(opt)}
                            className={`w-full text-left p-4 md:p-6 rounded-2xl transition-all border ${
                                currentValue === opt 
                                ? 'bg-[var(--color-washi)] border-[var(--color-japan-red)] text-[var(--color-japan-red)] font-bold' 
                                : 'bg-white border-[#E5E5E5] hover:border-[var(--color-ink)] text-[var(--color-ink)]'
                            }`}
                        >
                            <span className="inline-block w-8 font-bold text-[var(--color-ink-light)]">
                                {String.fromCharCode(65 + idx)}.
                            </span>
                            {opt}
                        </button>
                    ))}
                </div>
            );
        case 'typing':
            return (
                <input 
                    type="text"
                    value={currentValue || ''}
                    onChange={(e) => onAnswer(e.target.value)}
                    placeholder="Ketik jawabanmu di sini..."
                    className="w-full p-6 text-lg border border-[#E5E5E5] rounded-2xl focus:ring-2 focus:ring-[var(--color-japan-red)] focus:border-[var(--color-japan-red)] transition-all outline-none"
                />
            );
        case 'reading':
            return (
                <div className="flex flex-col gap-6">
                    <div className="p-6 bg-[var(--color-washi)] rounded-2xl text-[var(--color-ink)] leading-relaxed border border-[#E5E5E5] text-lg">
                        {question.context}
                    </div>
                    <div className="space-y-3 mt-2">
                        {question.options && question.options.map((opt, idx) => (
                            <button 
                                key={idx}
                                onClick={() => onAnswer(opt)}
                                className={`w-full text-left p-4 md:p-6 rounded-2xl transition-all border ${
                                    currentValue === opt 
                                    ? 'bg-[var(--color-washi)] border-[var(--color-japan-red)] text-[var(--color-japan-red)] font-bold' 
                                    : 'bg-white border-[#E5E5E5] hover:border-[var(--color-ink)] text-[var(--color-ink)]'
                                }`}
                            >
                                <span className="inline-block w-8 font-bold text-[var(--color-ink-light)]">
                                    {String.fromCharCode(65 + idx)}.
                                </span>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            );
        case 'listening':
            return (
                <div className="text-center p-8 bg-[var(--color-washi)] rounded-[2rem] border border-[#E5E5E5]">
                    <button 
                        onClick={() => {
                            const utterance = new SpeechSynthesisUtterance(question.spokenText);
                            utterance.lang = question.speechLang || 'ja-JP';
                            window.speechSynthesis.speak(utterance);
                        }}
                        className="bg-white hover:bg-gray-50 border border-[#E5E5E5] text-[var(--color-ink)] px-8 py-5 rounded-full transition-all font-medium flex items-center gap-3 mx-auto"
                    >
                        <Volume2 size={24} /> Putar Audio Pertanyaan
                    </button>
                    <div className="mt-8">
                        <input 
                            type="text" 
                            className="w-full max-w-md mx-auto p-4 md:p-6 rounded-2xl border border-[#E5E5E5] text-center focus:ring-2 focus:ring-[var(--color-japan-red)] focus:border-[var(--color-japan-red)] outline-none transition-all"
                            onChange={(e) => onAnswer(e.target.value)}
                            value={currentValue || ''}
                            placeholder="Ketik apa yang kamu dengar..."
                        />
                    </div>
                </div>
            );
        case 'image':
            return (
                <div className="flex flex-col gap-8">
                    <div className="flex justify-center">
                        <img src={question.imageUrl} alt="Pertanyaan" className="max-h-64 object-contain rounded-2xl border border-[#E5E5E5]" />
                    </div>
                    <div className="space-y-3">
                        {question.options && question.options.map((opt, idx) => (
                            <button 
                                key={idx}
                                onClick={() => onAnswer(opt)}
                                className={`w-full text-left p-4 md:p-6 rounded-2xl transition-all border ${
                                    currentValue === opt 
                                    ? 'bg-[var(--color-washi)] border-[var(--color-japan-red)] text-[var(--color-japan-red)] font-bold' 
                                    : 'bg-white border-[#E5E5E5] hover:border-[var(--color-ink)] text-[var(--color-ink)]'
                                }`}
                            >
                                <span className="inline-block w-8 font-bold text-[var(--color-ink-light)]">
                                    {String.fromCharCode(65 + idx)}.
                                </span>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            );
        case 'essay':
            return (
                <textarea 
                    rows={6}
                    value={currentValue || ''}
                    onChange={(e) => onAnswer(e.target.value)}
                    placeholder="Tulis esaimu di sini dengan bahasa Jepang..."
                    className="w-full p-6 text-lg border border-[#E5E5E5] rounded-2xl focus:ring-2 focus:ring-[var(--color-japan-red)] focus:border-[var(--color-japan-red)] transition-all outline-none resize-none"
                />
            );
        default:
            return <div className="text-[var(--color-ink-light)] italic">Tipe soal belum diatur.</div>;
    }
};

export default function MissionPlay({ meta, questions, passingScore = 80 }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [rewardState, setRewardState] = useState<{ show: boolean; passed: boolean; rewardData?: any; finalScore: number } | null>(null);

    const currentQuestion = questions[currentIndex];

    const handleAnswer = (val: string) => {
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: val }));
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) setCurrentIndex(idx => idx + 1);
    };

    const handlePrev = () => {
        if (currentIndex > 0) setCurrentIndex(idx => idx - 1);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            let totalCorrect = 0;
            let totalEssayScore = 0;
            let essayCount = 0;

            for (const q of questions) {
                const userAns = answers[q.id] || '';
                
                if (q.question_type === 'essay') {
                    essayCount++;
                    // Call Gemini API Auto-grading
                    try {
                        const res = await axios.post(`/student/missions/essay/${q.id}/grade`, { answer: userAns });
                        totalEssayScore += res.data.score || 0;
                    } catch (e) {
                        console.error('Error grading essay', e);
                    }
                } else {
                    if (validateUserAnswer(userAns, q.answer)) {
                        totalCorrect++;
                    }
                }
            }

            // Simple score calculation (weighted for essays if needed, but for simplicity we average)
            let baseScore = 0;
            if (questions.length - essayCount > 0) {
                baseScore = (totalCorrect / (questions.length - essayCount)) * 100;
            }
            
            let finalScore = baseScore;
            if (essayCount > 0) {
                const essayAvg = totalEssayScore / essayCount;
                if (questions.length === essayCount) {
                    finalScore = essayAvg;
                } else {
                    finalScore = (baseScore + essayAvg) / 2;
                }
            }
            
            finalScore = Math.round(finalScore);

            const response = await axios.post(`/student/missions/${meta.id}/${meta.subLevel}/submit`, { score: finalScore });
            
            setRewardState({
                show: true,
                passed: response.data.passed,
                rewardData: response.data.reward,
                finalScore
            });

        } catch (error) {
            console.error('Submit failed', error);
            alert('Gagal mengumpulkan jawaban. Coba lagi.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const progressPercent = ((currentIndex + 1) / questions.length) * 100;

    return (
        <div className="max-w-3xl mx-auto space-y-8 pt-8">
            <Head title={`Ujian: ${meta.title}`} />
            
            {/* Header & Progress */}
            <div className="flex items-center justify-between mb-4">
                <button 
                    onClick={() => router.visit(route('student.missions.level', meta.id))}
                    className="text-[var(--color-ink-light)] font-medium flex items-center gap-2 hover:text-[var(--color-ink)] transition-colors"
                >
                    <ChevronLeft size={18} /> Tinggalkan Ujian
                </button>
                <div className="text-sm font-medium text-[var(--color-ink-light)]">
                    {currentIndex + 1} / {questions.length}
                </div>
            </div>

            <div className="h-2 w-full bg-[var(--color-washi)] rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    className="h-full bg-[var(--color-japan-red)] rounded-full"
                />
            </div>
            
            <AnimatePresence mode="wait">
                <motion.div 
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-[2rem] border border-[#E5E5E5] overflow-hidden"
                >
                    <div className="p-8 md:p-10 border-b border-[#E5E5E5]">
                        <span className="inline-block text-[var(--color-ink-light)] font-bold text-xs tracking-widest uppercase mb-4">
                            {currentQuestion.question_type === 'essay' ? 'Tantangan Esai' : 'Pertanyaan'}
                        </span>
                        <h2 className="text-2xl font-bold text-[var(--color-ink)] leading-relaxed">
                            {currentQuestion.question}
                        </h2>
                    </div>

                    <div className="p-8 md:p-10 min-h-[300px]">
                        <QuestionRenderer 
                            question={currentQuestion}
                            currentValue={answers[currentQuestion.id]}
                            onAnswer={handleAnswer}
                        />
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Footer */}
            <div className="flex justify-between items-center px-4">
                <button 
                    onClick={handlePrev}
                    disabled={currentIndex === 0 || isSubmitting}
                    className="px-6 py-3 rounded-full font-medium text-[var(--color-ink-light)] hover:bg-[var(--color-washi)] hover:text-[var(--color-ink)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                    <ChevronLeft size={18} /> Sebelumnya
                </button>
                
                {currentIndex === questions.length - 1 ? (
                    <button 
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-[var(--color-japan-red)] hover:bg-red-800 text-white px-8 py-3 rounded-full font-medium transition-colors flex items-center gap-2"
                    >
                        {isSubmitting ? 'Memproses...' : 'Kumpulkan Jawaban'}
                    </button>
                ) : (
                    <button 
                        onClick={handleNext}
                        disabled={isSubmitting}
                        className="bg-[var(--color-ink)] hover:bg-black text-white px-8 py-3 rounded-full font-medium transition-colors flex items-center gap-2"
                    >
                        Selanjutnya <ChevronRight size={18} />
                    </button>
                )}
            </div>

            {/* Result Modal */}
            <AnimatePresence>
                {rewardState?.show && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm p-4"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-white p-10 md:p-12 rounded-[2rem] shadow-2xl max-w-lg w-full text-center border border-[#E5E5E5]"
                        >
                            <div className="mb-8">
                                {rewardState.passed ? (
                                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 size={48} className="text-green-500" />
                                    </div>
                                ) : (
                                    <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <XCircle size={48} className="text-[var(--color-japan-red)]" />
                                    </div>
                                )}
                                
                                <h3 className="text-3xl font-bold text-[var(--color-ink)] mb-2">
                                    {rewardState.passed ? 'Selamat! Anda Lulus' : 'Belum Berhasil'}
                                </h3>
                                <p className="text-[var(--color-ink-light)] mb-8 font-medium">
                                    Skor Akhir: <span className={`text-2xl font-bold ml-2 ${rewardState.passed ? 'text-green-600' : 'text-[var(--color-japan-red)]'}`}>{rewardState.finalScore}</span>
                                </p>
                                
                                {rewardState.passed && rewardState.rewardData && (
                                    <div className="bg-[var(--color-washi)] p-6 rounded-2xl border border-[#E5E5E5] mb-8">
                                        <h4 className="font-bold text-[var(--color-ink)] mb-1">{rewardState.rewardData.title}</h4>
                                        <p className="text-sm text-[var(--color-ink-light)]">{rewardState.rewardData.message}</p>
                                    </div>
                                )}

                                {!rewardState.passed && (
                                    <p className="text-[var(--color-ink-light)] bg-gray-50 p-4 rounded-xl border border-[#E5E5E5] mb-8 text-sm">
                                        Tetap semangat dan terus belajar. Anda dapat mengulangi ujian ini kapan saja.
                                    </p>
                                )}

                                <button 
                                    onClick={() => router.visit(route('student.missions.level', meta.id))}
                                    className="w-full bg-[var(--color-ink)] text-white font-medium py-4 rounded-full hover:bg-black transition-colors"
                                >
                                    Kembali ke Daftar Level
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

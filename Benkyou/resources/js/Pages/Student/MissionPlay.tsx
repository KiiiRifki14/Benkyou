import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import { motion, AnimatePresence } from "motion/react";

// Helper: menunggu voices Web Speech API siap (handles browser async loading)
function getVoicesAsync(): Promise<SpeechSynthesisVoice[]> {
    return new Promise((resolve) => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
            resolve(voices);
        } else {
            const handler = () => {
                window.speechSynthesis.removeEventListener("voiceschanged", handler);
                resolve(window.speechSynthesis.getVoices());
            };
            window.speechSynthesis.addEventListener("voiceschanged", handler);
            // Fallback jika event tidak terpicu dalam 3 detik
            setTimeout(() => {
                window.speechSynthesis.removeEventListener("voiceschanged", handler);
                resolve(window.speechSynthesis.getVoices());
            }, 3000);
        }
    });
}

async function speakJapanese(text: string, lang: string = "ja-JP") {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const voices = await getVoicesAsync();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.85; // sedikit diperlambat agar jelas

    // Cari voice Jepang
    const jpVoice = voices.find(
        (v) =>
            v.lang.toLowerCase().replace("_", "-").startsWith("ja") ||
            v.lang.toLowerCase().includes("jp")
    );
    if (jpVoice) {
        utterance.voice = jpVoice;
    }

    window.speechSynthesis.speak(utterance);
}
import {
    ChevronLeft,
    ChevronRight,
    Volume2,
    XCircle,
    CheckCircle2,
    Check,
    X,
    RefreshCcw,
} from "lucide-react";

declare function route(name: string, params?: any, absolute?: boolean): string;
import axios from "axios";

interface QuestionData {
    id: number;
    question_type: string;
    question: string;
    answer: string | string[];
    options?: string[];
    context?: string;
    spokenText?: string;
    speechLang?: string;
    imageUrl?: string;
    explanation?: string;
}

interface MetaData {
    id: string;
    title: string;
    subLevel: number;
}

// Utility Validation
export const validateUserAnswer = (
    userAns: string,
    correctAns: string | string[] | null,
): boolean => {
    if (!userAns || !correctAns) return false;
    const normalize = (text: string): string => text.trim().toLowerCase();
    const normalizedUser = normalize(userAns);

    if (Array.isArray(correctAns)) {
        return correctAns.some((ans) => {
            const normalizedAns = normalize(ans);
            return normalizedAns.split(',').map((s) => s.trim()).includes(normalizedUser);
        });
    }

    const answersList = String(correctAns).split(',').map((s) => normalize(s));
    return answersList.includes(normalizedUser);
};

const QuestionRenderer = ({
    question,
    currentValue,
    onAnswer,
    disabled,
}: {
    question: QuestionData;
    currentValue?: string;
    onAnswer: (val: string) => void;
    disabled: boolean;
}) => {
    switch (question.question_type) {
        case "multiple-choice":
        case "pg":
            return (
                <div className="space-y-3">
                    {(question.options || []).map((opt, idx) => (
                        <button
                            key={idx}
                            disabled={disabled}
                            onClick={() => onAnswer(opt)}
                            className={`w-full text-left p-4 md:p-6 rounded-2xl transition-all border ${
                                currentValue === opt
                                    ? "bg-[var(--color-washi)] border-[var(--color-japan-red)] text-[var(--color-japan-red)] font-bold"
                                    : "bg-white border-[#E5E5E5] hover:border-[var(--color-ink)] text-[var(--color-ink)]"
                            } ${disabled ? "opacity-70 cursor-not-allowed" : ""}`}
                        >
                            <span className="inline-block w-8 font-bold text-[var(--color-ink-light)]">
                                {String.fromCharCode(65 + idx)}.
                            </span>
                            {opt}
                        </button>
                    ))}
                </div>
            );
        case "typing":
            return (
                <input
                    type="text"
                    disabled={disabled}
                    value={currentValue || ""}
                    onChange={(e) => onAnswer(e.target.value)}
                    placeholder="Ketik jawabanmu di sini..."
                    className="w-full p-6 text-lg border border-[#E5E5E5] rounded-2xl focus:ring-2 focus:ring-[var(--color-japan-red)] focus:border-[var(--color-japan-red)] transition-all outline-none disabled:bg-gray-50"
                />
            );
        case "reading":
            return (
                <div className="flex flex-col gap-6">
                    <div className="p-6 bg-[var(--color-washi)] rounded-2xl text-[var(--color-ink)] leading-relaxed border border-[#E5E5E5] text-lg">
                        {question.context}
                    </div>
                    <div className="space-y-3 mt-2">
                        {question.options &&
                            question.options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    disabled={disabled}
                                    onClick={() => onAnswer(opt)}
                                    className={`w-full text-left p-4 md:p-6 rounded-2xl transition-all border ${
                                        currentValue === opt
                                            ? "bg-[var(--color-washi)] border-[var(--color-japan-red)] text-[var(--color-japan-red)] font-bold"
                                            : "bg-white border-[#E5E5E5] hover:border-[var(--color-ink)] text-[var(--color-ink)]"
                                    } ${disabled ? "opacity-70 cursor-not-allowed" : ""}`}
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
        case "listening":
            return (
                <div className="flex flex-col gap-6">
                    <div className="text-center p-8 bg-[var(--color-washi)] rounded-[2rem] border border-[#E5E5E5] flex flex-col items-center justify-center">
                        <button
                            onClick={() => speakJapanese(
                                question.spokenText || question.question,
                                question.speechLang || "ja-JP"
                            )}
                            className="bg-white hover:bg-gray-50 border border-[#E5E5E5] text-[var(--color-ink)] px-8 py-5 rounded-full transition-all font-medium flex items-center gap-3 mx-auto shadow-sm"
                            disabled={disabled}
                        >
                            <Volume2 size={24} /> Putar Audio Pertanyaan
                        </button>
                    </div>
                    {question.options && question.options.length > 0 ? (
                        <div className="space-y-3">
                            {question.options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    disabled={disabled}
                                    onClick={() => onAnswer(opt)}
                                    className={`w-full text-left p-4 md:p-6 rounded-2xl transition-all border ${
                                        currentValue === opt
                                            ? "bg-[var(--color-washi)] border-[var(--color-japan-red)] text-[var(--color-japan-red)] font-bold"
                                            : "bg-white border-[#E5E5E5] hover:border-[var(--color-ink)] text-[var(--color-ink)]"
                                    } ${disabled ? "opacity-70 cursor-not-allowed" : ""}`}
                                >
                                    <span className="inline-block w-8 font-bold text-[var(--color-ink-light)]">
                                        {String.fromCharCode(65 + idx)}.
                                    </span>
                                    {opt}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="mt-2">
                            <input
                                type="text"
                                disabled={disabled}
                                className="w-full p-6 text-lg border border-[#E5E5E5] rounded-2xl focus:ring-2 focus:ring-[var(--color-japan-red)] focus:border-[var(--color-japan-red)] outline-none transition-all disabled:bg-gray-50 text-center"
                                onChange={(e) => onAnswer(e.target.value)}
                                value={currentValue || ""}
                                placeholder="Ketik apa yang kamu dengar..."
                            />
                        </div>
                    )}
                </div>
            );
        case "image":
            return (
                <div className="flex flex-col gap-8">
                    <div className="flex justify-center">
                        <img
                            src={question.imageUrl}
                            alt="Pertanyaan"
                            className="max-h-64 object-contain rounded-2xl border border-[#E5E5E5]"
                        />
                    </div>
                    <div className="space-y-3">
                        {question.options &&
                            question.options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    disabled={disabled}
                                    onClick={() => onAnswer(opt)}
                                    className={`w-full text-left p-4 md:p-6 rounded-2xl transition-all border ${
                                        currentValue === opt
                                            ? "bg-[var(--color-washi)] border-[var(--color-japan-red)] text-[var(--color-japan-red)] font-bold"
                                            : "bg-white border-[#E5E5E5] hover:border-[var(--color-ink)] text-[var(--color-ink)]"
                                    } ${disabled ? "opacity-70 cursor-not-allowed" : ""}`}
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
        case "essay":
            return (
                <textarea
                    rows={6}
                    disabled={disabled}
                    value={currentValue || ""}
                    onChange={(e) => onAnswer(e.target.value)}
                    placeholder="Tulis esaimu di sini dengan bahasa Jepang..."
                    className="w-full p-6 text-lg border border-[#E5E5E5] rounded-2xl focus:ring-2 focus:ring-[var(--color-japan-red)] focus:border-[var(--color-japan-red)] transition-all outline-none resize-none disabled:bg-gray-50"
                />
            );
        default:
            return (
                <div className="text-[var(--color-ink-light)] italic">
                    Tipe soal belum diatur.
                </div>
            );
    }
};

export default function MissionPlay({
    meta,
    questions,
    passingScore = 80,
}: {
    meta: MetaData;
    questions: QuestionData[];
    passingScore?: number;
}) {
    if (!questions || questions.length === 0) {
        return (
            <div className="max-w-3xl mx-auto pt-20 text-center">
                <Head title={`Tantangan: ${meta?.title || "Mission"}`} />
                <h2 className="text-2xl font-bold mb-4">
                    Tidak ada soal untuk level ini.
                </h2>
                <button
                    onClick={() => router.visit(route("student.missions"))}
                    className="bg-[var(--color-ink)] text-white px-8 py-3 rounded-full"
                >
                    Kembali
                </button>
            </div>
        );
    }

    const storageKey = `benkyou_mission_progress_${meta.id}_${meta.subLevel}`;

    const getSavedValue = (key: string, defaultValue: any) => {
        try {
            const saved = localStorage.getItem(storageKey);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed && parsed[key] !== undefined) {
                    return parsed[key];
                }
            }
        } catch (e) {
            console.error("Error reading mission progress", e);
        }
        return defaultValue;
    };

    const [currentIndex, setCurrentIndex] = useState(() => getSavedValue("currentIndex", 0));
    const [answers, setAnswers] = useState<Record<number, string>>(() => getSavedValue("answers", {}));

    // Status per soal: 'answering' atau 'feedback'
    const [questionState, setQuestionState] = useState<"answering" | "feedback">(() => getSavedValue("questionState", "answering"));
    const [isChecking, setIsChecking] = useState(false);

    // Simpan hasil penilaian tiap soal (baik PG maupun essay)
    const [results, setResults] = useState<
        Record<
            number,
            { isCorrect: boolean; essayScore?: number; essayFeedback?: string }
        >
    >(() => getSavedValue("results", {}));

    React.useEffect(() => {
        try {
            const stateToSave = {
                currentIndex,
                answers,
                questionState,
                results,
            };
            localStorage.setItem(storageKey, JSON.stringify(stateToSave));
        } catch (e) {
            console.error("Error saving mission progress", e);
        }
    }, [currentIndex, answers, questionState, results, storageKey]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [rewardState, setRewardState] = useState<{
        show: boolean;
        passed: boolean;
        rewardData?: any;
        finalScore: number;
        totalCorrect: number;
        totalQuestions: number;
    } | null>(null);

    const currentQuestion = questions[currentIndex];

    const handleAnswer = (val: string) => {
        if (questionState === "answering") {
            setAnswers((prev) => ({ ...prev, [currentQuestion.id]: val }));
        }
    };

    const checkAnswer = async () => {
        const userAns = answers[currentQuestion.id];
        if (!userAns) return;

        setIsChecking(true);

        try {
            if (currentQuestion.question_type === "essay") {
                const res = await axios.post(
                    `/student/missions/essay/${currentQuestion.id}/grade`,
                    { answer: userAns },
                );
                const score = res.data.score || 0;
                setResults((prev) => ({
                    ...prev,
                    [currentQuestion.id]: {
                        isCorrect: score >= 70, // Threshold lulus esai
                        essayScore: score,
                        essayFeedback: res.data.feedback,
                    },
                }));
            } else {
                const correct = validateUserAnswer(
                    userAns,
                    currentQuestion.answer,
                );
                setResults((prev) => ({
                    ...prev,
                    [currentQuestion.id]: { isCorrect: correct },
                }));
            }
            setQuestionState("feedback");
        } catch (e) {
            console.error("Error checking answer", e);
            alert("Gagal mengecek jawaban. Periksa koneksi atau coba lagi.");
        } finally {
            setIsChecking(false);
        }
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex((idx: number) => idx + 1);
            setQuestionState("answering");
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            let totalCorrect = 0;
            let totalEssayScore = 0;
            let essayCount = 0;

            for (const q of questions) {
                const res = results[q.id];
                if (q.question_type === "essay") {
                    essayCount++;
                    totalEssayScore += res?.essayScore || 0;
                } else {
                    if (res?.isCorrect) {
                        totalCorrect++;
                    }
                }
            }

            let baseScore = 0;
            if (questions.length - essayCount > 0) {
                baseScore =
                    (totalCorrect / (questions.length - essayCount)) * 100;
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

            const response = await axios.post(
                `/student/missions/${meta.id}/${meta.subLevel}/submit`,
                { score: finalScore },
            );

            try {
                localStorage.removeItem(storageKey);
            } catch (e) {
                console.error("Error clearing progress storage", e);
            }

            setRewardState({
                show: true,
                passed: response.data.passed,
                rewardData: response.data.reward,
                finalScore,
                totalCorrect,
                totalQuestions: questions.length - essayCount,
            });
        } catch (error) {
            console.error("Submit failed", error);
            alert("Gagal mengumpulkan jawaban. Coba lagi.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRetry = () => {
        setAnswers({});
        setResults({});
        setCurrentIndex(0);
        setQuestionState("answering");
        setRewardState(null);
    };

    const progressPercent = (currentIndex / questions.length) * 100;
    const currentResult = results[currentQuestion?.id];

    return (
        <div className="max-w-3xl mx-auto space-y-8 pt-8 px-4 pb-20">
            <Head title={`Tantangan: ${meta.title}`} />

            {/* Header & Progress */}
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={() =>
                        router.visit(route("student.missions.level", meta.id))
                    }
                    className="text-[var(--color-ink-light)] font-medium flex items-center gap-2 hover:text-[var(--color-ink)] transition-colors"
                >
                    <ChevronLeft size={18} /> Tinggalkan
                </button>
                <div className="text-sm font-medium text-[var(--color-ink-light)]">
                    {currentIndex + 1} / {questions.length}
                </div>
            </div>

            <div className="h-2 w-full bg-[var(--color-washi)] rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    className="h-full bg-[var(--color-japan-red)] rounded-full transition-all duration-300"
                />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-[2rem] border border-[#E5E5E5] overflow-hidden shadow-sm"
                >
                    <div className="p-8 md:p-10 border-b border-[#E5E5E5]">
                        <span className="inline-block text-[var(--color-ink-light)] font-bold text-xs tracking-widest uppercase mb-4">
                            {currentQuestion.question_type === "essay"
                                ? "Tantangan Esai"
                                : "Pertanyaan"}
                        </span>
                        <h2 className="text-2xl font-bold text-[var(--color-ink)] leading-relaxed">
                            {currentQuestion.question}
                        </h2>
                    </div>

                    <div className="p-8 md:p-10 min-h-[250px]">
                        <QuestionRenderer
                            question={currentQuestion}
                            currentValue={answers[currentQuestion.id]}
                            onAnswer={handleAnswer}
                            disabled={
                                questionState === "feedback" || isChecking
                            }
                        />

                        {/* Immediate Feedback Box */}
                        <AnimatePresence>
                            {questionState === "feedback" && currentResult && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`mt-8 p-6 rounded-2xl border ${currentResult.isCorrect ? "bg-green-50 border-green-200 text-green-900" : "bg-red-50 border-red-200 text-red-900"}`}
                                >
                                    <div className="flex items-start gap-4">
                                        {currentResult.isCorrect ? (
                                            <div className="bg-green-100 p-2 rounded-full shrink-0">
                                                <Check
                                                    className="text-green-600"
                                                    size={24}
                                                />
                                            </div>
                                        ) : (
                                            <div className="bg-red-100 p-2 rounded-full shrink-0">
                                                <X
                                                    className="text-red-600"
                                                    size={24}
                                                />
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <h4 className="font-bold text-lg mb-2">
                                                {currentResult.isCorrect
                                                    ? "Benar Sekali!"
                                                    : "Kurang Tepat"}
                                            </h4>

                                            {currentQuestion.question_type ===
                                            "essay" ? (
                                                <div className="space-y-2">
                                                    <p className="font-bold">
                                                        Skor Esai:{" "}
                                                        {
                                                            currentResult.essayScore
                                                        }
                                                        /100
                                                    </p>
                                                    <p className="leading-relaxed opacity-90">
                                                        {
                                                            currentResult.essayFeedback
                                                        }
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="space-y-2">
                                                    {!currentResult.isCorrect && (
                                                        <p className="font-medium text-red-800">
                                                            Jawaban yang benar:{" "}
                                                            {Array.isArray(
                                                                currentQuestion.answer,
                                                            )
                                                                ? currentQuestion.answer.join(
                                                                      " / ",
                                                                  )
                                                                : currentQuestion.answer}
                                                        </p>
                                                    )}
                                                    {currentQuestion.explanation && (
                                                        <p className="leading-relaxed opacity-90 mt-2 border-t pt-2 border-opacity-20 border-current">
                                                            <span className="font-bold">
                                                                Penjelasan:
                                                            </span>{" "}
                                                            {
                                                                currentQuestion.explanation
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Footer */}
            <div className="flex justify-end items-center mt-6">
                {questionState === "answering" ? (
                    <button
                        onClick={checkAnswer}
                        disabled={!answers[currentQuestion.id] || isChecking}
                        className="bg-[var(--color-japan-red)] hover:bg-red-800 text-white px-8 py-4 rounded-full font-bold transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                    >
                        {isChecking ? "Memeriksa..." : "Periksa Jawaban"}
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        disabled={isSubmitting}
                        className="bg-[var(--color-ink)] hover:bg-black text-white px-8 py-4 rounded-full font-bold transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
                    >
                        {currentIndex === questions.length - 1
                            ? isSubmitting
                                ? "Mengumpulkan..."
                                : "Kumpulkan & Selesai"
                            : "Lanjut ke Soal Berikutnya"}{" "}
                        <ChevronRight size={18} />
                    </button>
                )}
            </div>

            {/* Result Modal */}
            <AnimatePresence>
                {rewardState?.show && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl max-w-lg w-full text-center border-4 border-white"
                        >
                            <div className="mb-8">
                                {rewardState.passed ? (
                                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                                        <CheckCircle2
                                            size={48}
                                            className="text-green-600"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                                        <XCircle
                                            size={48}
                                            className="text-[var(--color-japan-red)]"
                                        />
                                    </div>
                                )}

                                <h3 className="text-3xl font-black text-[var(--color-ink)] mb-2 tracking-tight">
                                    {rewardState.passed
                                        ? "Misi Berhasil! 🎉"
                                        : "Misi Gagal"}
                                </h3>

                                <div className="bg-gray-50 rounded-2xl p-6 my-8 border border-gray-100">
                                    <p className="text-[var(--color-ink-light)] mb-2 font-medium uppercase tracking-widest text-xs">
                                        Skor Akhir
                                    </p>
                                    <p
                                        className={`text-6xl font-black mb-4 ${rewardState.passed ? "text-green-600" : "text-[var(--color-japan-red)]"}`}
                                    >
                                        {rewardState.finalScore}
                                    </p>

                                    {rewardState.totalQuestions > 0 && (
                                        <p className="text-sm font-medium text-gray-600">
                                            Benar{" "}
                                            <span className="font-bold">
                                                {rewardState.totalCorrect}
                                            </span>{" "}
                                            dari{" "}
                                            <span className="font-bold">
                                                {rewardState.totalQuestions}
                                            </span>{" "}
                                            Soal PG/Lainnya
                                        </p>
                                    )}
                                </div>

                                {rewardState.passed &&
                                    rewardState.rewardData && (
                                        <div className="bg-[var(--color-washi)] p-6 rounded-2xl border border-[var(--color-japan-red)] mb-8 text-left shadow-sm">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-2xl">
                                                    🎁
                                                </span>
                                                <h4 className="font-bold text-[var(--color-japan-red)]">
                                                    {
                                                        rewardState.rewardData
                                                            .title
                                                    }
                                                </h4>
                                            </div>
                                            <p className="text-sm text-[var(--color-ink)] font-medium ml-9">
                                                {rewardState.rewardData.message}
                                            </p>
                                        </div>
                                    )}

                                <div className="space-y-3">
                                    <button
                                        onClick={() =>
                                            router.visit(
                                                route(
                                                    "student.missions.level",
                                                    meta.id,
                                                ),
                                            )
                                        }
                                        className="w-full bg-[var(--color-ink)] text-white font-bold py-4 rounded-xl hover:bg-black transition-colors shadow-md"
                                    >
                                        Kembali ke Menu
                                    </button>

                                    <button
                                        onClick={handleRetry}
                                        className="w-full bg-white text-[var(--color-ink)] border-2 border-[var(--color-ink)] font-bold py-4 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <RefreshCcw size={18} />{" "}
                                        {rewardState.passed
                                            ? "Kerjakan Ulang"
                                            : "Perbaiki Nilai"}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

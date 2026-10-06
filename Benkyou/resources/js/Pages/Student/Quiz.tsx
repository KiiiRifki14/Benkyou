import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { vocabulary } from "../../data/vocabulary";
import { kanji } from "../../data/kanji";
import { grammar } from "../../data/grammar";
import { CheckCircle2, XCircle, RefreshCw, ChevronRight } from "lucide-react";
import Layout from "@/Components/Layout";

interface Question {
    text: string;
    options: string[];
    answer: string;
    category: string;
    explanation?: string;
}

interface DatabaseQuestion {
    id: number;
    type: string;
    question_type: string;
    question: string;
    options: string[] | string;
    answer: string | string[];
    explanation?: string;
}

export default function Quiz({
    questionsData = [],
}: {
    questionsData?: DatabaseQuestion[];
}) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [preparedQuestions, setPreparedQuestions] = useState<
        Question[] | null
    >(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [answered, setAnswered] = useState(false);

    useEffect(() => {
        if (questionsData && questionsData.length > 0) {
            const formatted = questionsData.map((q) => {
                let parsedOptions = [];
                try {
                    parsedOptions =
                        typeof q.options === "string"
                            ? JSON.parse(q.options)
                            : q.options;
                } catch (e) {
                    parsedOptions = (
                        Array.isArray(q.options) ? q.options : []
                    ) as any[];
                }

                let parsedAnswer = "";
                try {
                    parsedAnswer =
                        typeof q.answer === "string"
                            ? JSON.parse(q.answer)
                            : q.answer;
                    if (Array.isArray(parsedAnswer)) {
                        parsedAnswer = parsedAnswer[0];
                    }
                } catch (e) {
                    parsedAnswer = (q.answer as string) || "";
                }

                return {
                    text: q.question,
                    options: parsedOptions,
                    answer: parsedAnswer,
                    category: "Latihan Harian",
                    explanation: q.explanation,
                };
            });
            setQuestions(formatted);
            prepareQuestions(formatted);
            resetState();
        } else {
            generateQuestions();
        }
    }, [questionsData]);

    // Log quiz completion to activity tracker
    useEffect(() => {
        if (showResult && totalQuestions > 0) {
            (window as any).axios
                ?.post("/student/quiz/log", {
                    score: score,
                    total: totalQuestions,
                    category: "Latihan Harian",
                })
                .catch(() => {}); // silently fail
        }
    }, [showResult]);

    const shuffleArray = <T,>(arr: T[]) => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    const prepareQuestions = (src: Question[]) => {
        const clone = src.map((q) => ({
            ...q,
            options: q.options ? [...q.options] : [],
        }));
        // shuffle options per question
        clone.forEach((q) => {
            if (q.options && q.options.length > 0) {
                shuffleArray(q.options);
            }
        });
        // shuffle question order
        const shuffled = shuffleArray(clone);
        setQuestions(src);
        setPreparedQuestions(shuffled);
    };

    const generateQuestions = () => {
        const mixedQuestions: Question[] = [];

        // Shuffle arrays
        const shuffledVocab = [...vocabulary].sort(() => 0.5 - Math.random());
        const shuffledKanji = [...kanji].sort(() => 0.5 - Math.random());
        const shuffledGrammar = [...grammar].sort(() => 0.5 - Math.random());

        // 1. Vocabulary Questions (4 items)
        shuffledVocab.slice(0, 4).forEach((v) => {
            const others = shuffledVocab
                .filter((x) => x.id !== v.id)
                .slice(0, 3)
                .map((x) => x.meaning);

            mixedQuestions.push({
                text: `Apa arti dari "${v.word}" (${v.romaji})?`,
                options: [...others, v.meaning].sort(() => 0.5 - Math.random()),
                answer: v.meaning,
                category: "Vocabulary",
            });
        });

        // 2. Kanji Questions (3 items)
        shuffledKanji.slice(0, 3).forEach((k) => {
            const others = shuffledKanji
                .filter((x) => x.kanji !== k.kanji)
                .slice(0, 3)
                .map((x) => x.meaning);

            mixedQuestions.push({
                text: `Apa arti dari Kanji "${k.kanji}"?`,
                options: [...others, k.meaning].sort(() => 0.5 - Math.random()),
                answer: k.meaning,
                category: "Kanji",
            });
        });

        // 3. Grammar Questions (3 items)
        shuffledGrammar.slice(0, 3).forEach((g) => {
            const example =
                g.examples[Math.floor(Math.random() * g.examples.length)];

            let others = shuffledGrammar
                .filter((x) => x.id !== g.id)
                .map((x) => x.examples[0].jp)
                .slice(0, 3);

            // Fallback if not enough grammar examples
            if (others.length < 3) {
                others = [
                    "私は学生です。",
                    "犬じゃありません。",
                    "ペンですか。",
                ]
                    .slice(0, 3 - others.length)
                    .concat(others);
            }

            mixedQuestions.push({
                text: `Bagaimana cara mengatakan "${example.en}" dalam bahasa Jepang?`,
                options: [...others, example.jp].sort(
                    () => 0.5 - Math.random(),
                ),
                answer: example.jp,
                category: "Grammar",
            });
        });

        // set canonical questions and prepare shuffled copy for runtime
        setQuestions(mixedQuestions);
        prepareQuestions(mixedQuestions);
        resetState();
    };

    const resetState = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setSelectedAnswer(null);
        setAnswered(false);
    };

    const handleAnswer = (option: string) => {
        if (answered) return;
        setSelectedAnswer(option);
        setAnswered(true);
        const q =
            preparedQuestions && preparedQuestions.length > 0
                ? preparedQuestions[currentQuestion]
                : questions[currentQuestion];
        const normalize = (s: string) => (s || "").trim().toLowerCase();
        if (normalize(option) === normalize(q.answer)) {
            setScore((s) => s + 1);
        }
    };

    const nextQuestion = () => {
        const next = currentQuestion + 1;
        const total =
            preparedQuestions && preparedQuestions.length > 0
                ? preparedQuestions.length
                : questions.length;
        if (next < total) {
            setCurrentQuestion(next);
            setSelectedAnswer(null);
            setAnswered(false);
        } else {
            setShowResult(true);
        }
    };

    const totalQuestions =
        preparedQuestions && preparedQuestions.length > 0
            ? preparedQuestions.length
            : questions.length;
    if (totalQuestions === 0) return null;

    if (showResult) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-md mx-auto text-center space-y-6 sm:space-y-8 py-6 sm:py-12 px-2 sm:px-4"
            >
                <div className="bg-white p-5 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl shadow-xl border border-[#E5E5E5] space-y-4 sm:space-y-6">
                    <h2 className="text-xl sm:text-3xl font-serif">
                        Hasil Latihan
                    </h2>
                    <div className="text-4xl sm:text-6xl font-bold text-[var(--color-japan-red)]">
                        {score}{" "}
                        <span className="text-lg sm:text-2xl text-gray-400">
                            / {totalQuestions}
                        </span>
                    </div>
                    <p className="text-[var(--color-ink-light)] text-xs sm:text-base">
                        Kerja bagus, kamu telah berlatih kemampuan bahasa
                        Jepangmu!
                    </p>
                    <button
                        onClick={generateQuestions}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-3 rounded-full bg-[var(--color-ink)] text-white font-medium hover:bg-black transition-all mx-auto text-xs sm:text-base"
                    >
                        <RefreshCw size={16} /> Latihan Baru
                    </button>
                </div>
            </motion.div>
        );
    }

    const q =
        preparedQuestions && preparedQuestions.length > 0
            ? preparedQuestions[currentQuestion]
            : questions[currentQuestion];

    return (
        <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6 pb-12 px-1 sm:px-4">
            {/* ── Sub-bar & Status Badge (Stich Mobile Reference) ── */}
            <div className="flex items-center justify-between gap-2 pt-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fbf2ed] text-[#c73e3a] border border-[#efe6e2] shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c73e3a] animate-pulse" />
                    <span className="text-[10px] sm:text-xs tracking-wider font-bold uppercase font-outfit">
                        PRACTICE HUB • 毎日の練習
                    </span>
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#d0ffd8] text-[#00210d] text-[10px] sm:text-xs font-bold border border-[#bcefc6]">
                    <span>⚡</span>
                    <span>+30 XP</span>
                </div>
            </div>

            {/* ── Header ── */}
            <header className="space-y-1 sm:space-y-2 text-left sm:text-center">
                <h1 className="font-outfit text-xl sm:text-3xl font-bold text-[#1e1b18]">
                    Latihan Interaktif
                </h1>
                <p className="text-xs sm:text-sm text-[#59413f] leading-relaxed">
                    Pertajam refleks kanji, perbendaharaan kata, dan pemahaman tata bahasa Jepangmu.
                </p>
            </header>

            {/* ── Question Card Container ── */}
            <div className="bg-white p-4 sm:p-7 md:p-9 rounded-2xl sm:rounded-3xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border border-[#efe6e2] space-y-4 sm:space-y-6">
                {/* Card Top Meta */}
                <div className="flex items-center justify-between pb-3 border-b border-[#efe6e2]">
                    <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#fff0ef] text-[#c73e3a] text-[10px] sm:text-xs font-bold border border-[#ffd9dd]">
                            {q.category}
                        </span>
                        <span className="text-[10px] sm:text-xs text-[#79716b] font-medium">
                            Acak Harian
                        </span>
                    </div>
                    <div className="text-xs sm:text-sm font-mono font-bold text-[#1e1b18]">
                        Soal {currentQuestion + 1} <span className="text-[#79716b] font-normal">/ {totalQuestions}</span>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-[#f5ece7] rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-[#c73e3a] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                {/* Question Prompt */}
                <div className="p-4 sm:p-6 rounded-xl bg-[#fbf2ed]/60 border border-[#efe6e2]/80 text-center">
                    <h2 className="font-outfit text-base sm:text-xl md:text-2xl font-bold text-[#1e1b18] leading-relaxed break-words">
                        {q.text}
                    </h2>
                    {q.explanation && answered && (
                        <p className="mt-2 text-xs text-[#59413f] italic bg-white/70 p-2 rounded-lg border border-[#efe6e2]">
                            💡 {q.explanation}
                        </p>
                    )}
                </div>

                {/* Options List */}
                <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
                    {q.options.map((opt, idx) => {
                        const optionLetters = ["A", "B", "C", "D"];
                        const normalize = (s: string) => (s || "").trim().toLowerCase();
                        const isCorrect = normalize(opt) === normalize(q.answer);
                        const isSelected = normalize(opt) === normalize(selectedAnswer || "");

                        let buttonStyles = "bg-[#fbf2ed]/40 border-[#efe6e2] hover:bg-[#f5ece7] text-[#1e1b18]";
                        let letterBadgeStyle = "bg-[#efe6e2] text-[#59413f]";

                        if (answered) {
                            if (isCorrect) {
                                buttonStyles = "bg-[#d0ffd8] border-[#326040] text-[#00210d] ring-1 ring-[#326040]";
                                letterBadgeStyle = "bg-[#326040] text-white";
                            } else if (isSelected) {
                                buttonStyles = "bg-[#fff0ef] border-[#c73e3a] text-[#c73e3a] ring-1 ring-[#c73e3a]";
                                letterBadgeStyle = "bg-[#c73e3a] text-white";
                            } else {
                                buttonStyles = "bg-white border-[#efe6e2] opacity-40 text-[#79716b]";
                                letterBadgeStyle = "bg-[#efe6e2] text-[#79716b]";
                            }
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(opt)}
                                disabled={answered}
                                className={`w-full min-h-[50px] p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 text-left cursor-pointer active:scale-[0.99] ${buttonStyles}`}
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${letterBadgeStyle}`}>
                                        {optionLetters[idx] || (idx + 1)}
                                    </span>
                                    <span className="font-semibold text-xs sm:text-base break-words">
                                        {opt}
                                    </span>
                                </div>

                                {answered && isCorrect && (
                                    <div className="flex items-center gap-1 text-[#326040] text-xs font-bold shrink-0">
                                        <span className="hidden sm:inline">Tepat!</span>
                                        <CheckCircle2 size={18} className="text-[#326040]" />
                                    </div>
                                )}
                                {answered && isSelected && !isCorrect && (
                                    <div className="flex items-center gap-1 text-[#c73e3a] text-xs font-bold shrink-0">
                                        <span className="hidden sm:inline">Kurang Tepat</span>
                                        <XCircle size={18} className="text-[#c73e3a]" />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Next Button */}
                {answered && (
                    <motion.button
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={nextQuestion}
                        className="w-full min-h-[46px] py-3 rounded-xl bg-[#c73e3a] hover:bg-[#a52525] text-white font-bold flex items-center justify-center gap-2 text-xs sm:text-sm shadow-[0_2px_8px_rgba(199,62,58,0.25)] transition-all cursor-pointer active:scale-95"
                    >
                        <span>
                            {currentQuestion === totalQuestions - 1 ? "Selesaikan Latihan" : "Soal Berikutnya"}
                        </span>
                        <ChevronRight size={16} />
                    </motion.button>
                )}
            </div>
        </div>
    );
}

Quiz.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;

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
                    parsedOptions = q.options || [];
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
                className="max-w-md mx-auto text-center space-y-8 py-12 px-2 sm:px-4"
            >
                <div className="bg-white p-6 sm:p-12 rounded-3xl shadow-xl border border-[#E5E5E5] space-y-6">
                    <h2 className="text-2xl sm:text-3xl font-serif">
                        Hasil Latihan
                    </h2>
                    <div className="text-5xl sm:text-6xl font-bold text-[var(--color-japan-red)]">
                        {score}{" "}
                        <span className="text-xl sm:text-2xl text-gray-400">
                            / {totalQuestions}
                        </span>
                    </div>
                    <p className="text-[var(--color-ink-light)] text-sm sm:text-base">
                        Kerja bagus, kamu telah berlatih kemampuan bahasa
                        Jepangmu!
                    </p>
                    <button
                        onClick={generateQuestions}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-full bg-[var(--color-ink)] text-white font-medium hover:bg-black transition-all mx-auto"
                    >
                        <RefreshCw size={18} /> Latihan Baru
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
        <div className="max-w-2xl mx-auto space-y-8 pb-12 px-2 sm:px-4">
            <header className="text-center space-y-4 mb-8 sm:mb-10">
                <h1 className="font-serif text-3xl sm:text-4xl font-light">
                    Latihan Tanpa Batas
                </h1>
                <p className="text-[var(--color-ink-light)] max-w-xl mx-auto text-sm sm:text-base">
                    Kamu bisa mengulang latihan ini berkali-kali! Setiap sesi
                    akan mengacak 10 pertanyaan dari Kosakata, Kanji, dan Tata
                    Bahasa.
                </p>
            </header>

            <div className="flex justify-between items-center bg-white p-3 sm:p-4 rounded-2xl border border-[#E5E5E5]">
                <div className="flex items-center gap-2 max-w-[60%]">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-japan-red)] flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider truncate">
                        {q.category}
                    </span>
                </div>
                <div className="text-xs sm:text-sm font-mono text-[var(--color-ink-light)]">
                    {currentQuestion + 1} / {totalQuestions}
                </div>
            </div>

            <div className="bg-white p-6 sm:p-8 md:p-12 rounded-3xl shadow-lg border border-[#E5E5E5] space-y-6 sm:space-y-8">
                <h2 className="text-xl sm:text-2xl text-center leading-relaxed font-light">
                    {q.text}
                </h2>

                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    {q.options.map((opt, idx) => {
                        const normalize = (s: string) =>
                            (s || "").trim().toLowerCase();
                        const isCorrect =
                            normalize(opt) === normalize(q.answer);
                        const isSelected =
                            normalize(opt) === normalize(selectedAnswer || "");

                        let variant =
                            "border-[#E5E5E5] hover:border-[var(--color-ink)]";
                        if (answered) {
                            if (isCorrect)
                                variant =
                                    "border-green-500 bg-green-50 text-green-700 ring-1 ring-green-200";
                            else if (isSelected)
                                variant =
                                    "border-red-400 bg-red-50 text-red-600";
                            else variant = "border-[#E5E5E5] opacity-50";
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(opt)}
                                disabled={answered}
                                className={`w-full p-4 sm:p-5 rounded-2xl border-2 text-left transition-all duration-200 flex justify-between items-center gap-2 ${variant}`}
                            >
                                <span className="font-medium text-sm sm:text-base">
                                    {opt}
                                </span>
                                {answered && isCorrect && (
                                    <CheckCircle2
                                        size={18}
                                        className="text-green-500 flex-shrink-0"
                                    />
                                )}
                                {answered && isSelected && !isCorrect && (
                                    <XCircle
                                        size={18}
                                        className="text-red-500 flex-shrink-0"
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>

                {answered && (
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={nextQuestion}
                        className="w-full py-3 sm:py-4 rounded-xl bg-[var(--color-ink)] text-white font-bold flex items-center justify-center gap-2 hover:bg-black text-sm sm:text-base"
                    >
                        {currentQuestion === totalQuestions - 1
                            ? "Selesaikan"
                            : "Soal Berikutnya"}{" "}
                        <ChevronRight size={18} />
                    </motion.button>
                )}
            </div>
        </div>
    );
}

Quiz.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;

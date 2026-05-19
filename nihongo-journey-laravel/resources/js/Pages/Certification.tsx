import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { certificationCategories, CertificationCategory, CertificationLevel, CertificationQuestion } from '../data/certification';
import { Trophy, Award, BookOpen, AlertCircle, RefreshCw, Volume2, Send, CheckCircle2, XCircle, Type, Headphones, Eye, Lock, Unlock, ArrowLeft, Image as ImageIcon } from 'lucide-react';

export default function Certification() {
  const [selectedCategory, setSelectedCategory] = useState<CertificationCategory | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<CertificationLevel | null>(null);
  const [unlockedLevels, setUnlockedLevels] = useState<Record<string, number[]>>(() => {
    try {
      const saved = localStorage.getItem('unlockedCertificationLevels');
      return saved ? JSON.parse(saved) : { n5: [1], n4: [1], n3: [1], n2: [1], n1: [1] };
    } catch(e) {
      return { n5: [1], n4: [1], n3: [1], n2: [1], n1: [1] };
    }
  });

  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  
  // States for answering
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [typingInput, setTypingInput] = useState('');
  const [isTypingCorrect, setIsTypingCorrect] = useState<boolean | null>(null);

  // Use effect to persist unlocked levels
  useEffect(() => {
    localStorage.setItem('unlockedCertificationLevels', JSON.stringify(unlockedLevels));
  }, [unlockedLevels]);

  const selectCategoryAction = (cat: CertificationCategory) => {
    setSelectedCategory(cat);
    setSelectedLevel(null);
    setStarted(false);
    setShowResult(false);
  };

  const selectLevelAction = (lvl: CertificationLevel) => {
    if (selectedCategory && unlockedLevels[selectedCategory.id].includes(lvl.id)) {
      setSelectedLevel(lvl);
      setStarted(false);
      setShowResult(false);
    }
  };

  const backToCategories = () => {
    setSelectedCategory(null);
    setSelectedLevel(null);
    setShowResult(false);
    setStarted(false);
  };

  const backToLevels = () => {
    setSelectedLevel(null);
    setShowResult(false);
    setStarted(false);
  };

  const startQuiz = () => {
    setStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    resetQuestionState();
  };

  const resetQuestionState = () => {
    setSelectedAnswer(null);
    setAnswered(false);
    setTypingInput('');
    setIsTypingCorrect(null);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const handleMultipleChoiceAnswer = (option: string) => {
    if (answered || !selectedLevel) return;
    setSelectedAnswer(option);
    setAnswered(true);
    
    const q = selectedLevel.questions[currentQuestion];
    const isCorrect = Array.isArray(q.answer) ? q.answer.includes(option) : option === q.answer;
    
    if (isCorrect) {
      setScore(s => s + 1);
    }
  };

  const handleTypingSubmit = () => {
    if (!typingInput.trim() || answered || !selectedLevel) return;
    setAnswered(true);
    
    const q = selectedLevel.questions[currentQuestion];
    const normalizedInput = typingInput.trim().toLowerCase();

    const isCorrect = Array.isArray(q.answer)
      ? q.answer.some(a => a.toLowerCase() === normalizedInput)
      : (q.answer as string).toLowerCase() === normalizedInput;

    setIsTypingCorrect(isCorrect);
    if (isCorrect) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (!selectedLevel || !selectedCategory) return;
    const next = currentQuestion + 1;
    if (next < selectedLevel.questions.length) {
      setCurrentQuestion(next);
      resetQuestionState();
    } else {
      setShowResult(true);
      resetQuestionState();
      
      const percentageScore = Math.round((score / selectedLevel.questions.length) * 100);
      const isPassed = percentageScore >= selectedLevel.passingScore;
      
      if (isPassed && !unlockedLevels[selectedCategory.id].includes(selectedLevel.id + 1)) {
        setUnlockedLevels(prev => {
          const currentUnlocked = prev[selectedCategory.id];
          return {
            ...prev,
            [selectedCategory.id]: [...currentUnlocked, selectedLevel.id + 1]
          };
        });
      }
    }
  };

  const playAudio = (text: string, lang: string = 'ja-JP') => {
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.8; // Talk a little slower for beginners
        window.speechSynthesis.speak(utterance);
      } else {
        alert("Mohon maaf, fitur audio (Text-to-Speech) tidak didukung di browser ini.");
      }
    } catch(err) {
      console.error(err);
    }
  };

  const percentage = selectedLevel ? Math.round((score / selectedLevel.questions.length) * 100) : 0;
  const passed = selectedLevel ? percentage >= selectedLevel.passingScore : false;

  const handleResetProgress = () => {
    if (window.confirm('Apakah kamu yakin ingin mereset progres untuk kategori ini?')) {
      if (selectedCategory) {
        setUnlockedLevels(prev => ({
          ...prev,
          [selectedCategory.id]: [1]
        }));
        setSelectedLevel(null);
      }
    }
  };

  if (!selectedCategory) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto space-y-8 pb-12"
      >
        <header className="text-center space-y-4">
          <div className="w-20 h-20 bg-[var(--color-japan-red)] rounded-full flex items-center justify-center mx-auto text-white shadow-xl mb-4">
            <Trophy size={40} />
          </div>
          <h1 className="font-serif text-4xl mb-4">Sertifikasi JLPT</h1>
          <p className="text-lg text-[var(--color-ink-light)] max-w-2xl mx-auto">
            Pilih kategori sertifikasi untuk menguji kemampuanmu. Selesaikan seluruh bab level untuk mendapatkan sertifikat dan tema unik!
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {certificationCategories.map((cat) => {
             const unlocked = unlockedLevels[cat.id];
             const isCompleted = unlocked.includes(cat.levels.length + 1);
             // We can check if they actually passed level 10 somehow, but if 10 is unlocked, it means 1-9 are done. Wait, to pass level 10, there's no level 11.
             // We'll just define completed if they passed level 10. For now, we'll mark the specific "Mastered" status in state if needed or just use unlocked length
             // Let's assume if they passed level 10, we could add '11' to the array to mark completion, but we capped it. 
             // We'll handle full completion in the result screen.
            return (
              <button 
                key={cat.id}
                onClick={() => selectCategoryAction(cat)}
                className="p-6 md:p-8 rounded-3xl border border-[#E5E5E5] bg-white text-left transition-all duration-300 relative flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 hover:border-black hover:shadow-lg hover:-translate-y-1 text-center md:text-left"
              >
                <div className="w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center text-white shadow-md relative overflow-hidden" style={{ backgroundColor: cat.themeColor }}>
                  <Award size={32} />
                  {unlocked.length > 5 && <div className="absolute inset-0 bg-white/20" />}
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-2xl font-bold mb-2">{cat.title}</h3>
                  <p className="text-[var(--color-ink-light)]">{cat.description}</p>
                </div>
                <div className="shrink-0 text-center md:text-right mt-2 md:mt-0 md:pr-4 w-full md:w-auto border-t md:border-none pt-4 md:pt-0 border-gray-100">
                   <div className="text-2xl font-bold" style={{ color: isCompleted ? 'var(--color-japan-red)' : '' }}>
                      {isCompleted ? 'LULUS' : 'BELUM'}
                   </div>
                   <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">Status Sertifikasi</div>
                </div>
              </button>
            )
          })}
        </div>
      </motion.div>
    );
  }

  if (!selectedLevel) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto space-y-8 pb-12"
      >
        <button onClick={backToCategories} className="flex items-center gap-2 text-[var(--color-ink-light)] hover:text-black transition-colors mb-4 -mt-4">
          <ArrowLeft size={20} /> Kembali ke Pilihan Kategori
        </button>
        <header className="text-center space-y-4 mb-10">
          <h1 className="font-serif text-4xl mb-4" style={{ color: selectedCategory.themeColor }}>
            {selectedCategory.title}
          </h1>
          <p className="text-lg text-[var(--color-ink-light)] max-w-2xl mx-auto">
            {selectedCategory.description}
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={handleResetProgress} className="text-sm font-medium text-red-500 hover:text-red-700 underline underline-offset-4">
              Reset Progres {selectedCategory.id.toUpperCase()}
            </button>
          </div>
        </header>
        
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {selectedCategory.levels.map((lvl) => {
            const isUnlocked = unlockedLevels[selectedCategory.id].includes(lvl.id);
            return (
              <button 
                key={lvl.id}
                onClick={() => selectLevelAction(lvl)}
                disabled={!isUnlocked}
                className={`p-6 rounded-2xl border text-center transition-all duration-300 relative flex flex-col items-center gap-4 ${
                  isUnlocked 
                    ? 'bg-white border-[#E5E5E5] hover:border-black hover:shadow-md cursor-pointer hover:-translate-y-1' 
                    : 'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed'
                }`}
              >
                <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center text-white ${isUnlocked ? 'shadow-sm' : 'bg-gray-300'}`} style={{ backgroundColor: isUnlocked ? selectedCategory.themeColor : undefined }}>
                  {isUnlocked ? <Unlock size={20} /> : <Lock size={20} />}
                </div>
                <div>
                  <h3 className="font-bold mb-1">Level {lvl.id}</h3>
                  <p className="text-xs text-[var(--color-ink-light)]">{lvl.questions.length} Soal</p>
                </div>
              </button>
            )
          })}
        </div>
      </motion.div>
    );
  }

  if (!started) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto text-center space-y-8 py-12"
      >
        <button onClick={backToLevels} className="flex items-center gap-2 text-[var(--color-ink-light)] hover:text-black transition-colors mb-4">
          <ArrowLeft size={20} /> Kembali ke Pilihan Level
        </button>
        <div className="w-24 h-24 bg-[var(--color-japan-red)] rounded-full flex items-center justify-center mx-auto text-white shadow-xl">
          <Award size={48} />
        </div>
        <h1 className="font-serif text-3xl md:text-4xl mb-4">{selectedLevel.title}</h1>
        <p className="text-base md:text-lg text-[var(--color-ink-light)] max-w-lg mx-auto">
          {selectedLevel.description}
        </p>
        <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5] text-left space-y-4 shadow-sm max-w-md mx-auto">
          <h3 className="font-bold text-sm uppercase tracking-widest flex items-center gap-2">
            <BookOpen size={16} /> Detail Ujian
          </h3>
          <ul className="text-sm space-y-2 text-[var(--color-ink-light)]">
            <li>• Soal: {selectedLevel.questions.length} Pertanyaan</li>
            <li>• Jenis: Kosakata, Tata Bahasa, Membaca, Mendengar</li>
            <li>• Syarat Lulus: {selectedLevel.passingScore}% Jawaban Benar</li>
          </ul>
        </div>
        <button 
          onClick={startQuiz}
          className="px-12 py-4 rounded-full bg-[var(--color-japan-red)] text-white font-bold text-lg hover:shadow-lg transition-all hover:-translate-y-1"
        >
          Mulai Ujian
        </button>
      </motion.div>
    );
  }

  if (showResult && selectedLevel && selectedCategory) {
    const isFullCompletion = passed && selectedLevel.id === selectedCategory.levels.length;
    
    return (
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-xl mx-auto bg-white p-6 md:p-12 rounded-3xl shadow-xl border border-[#E5E5E5] text-center space-y-8"
      >
        {passed ? (
          <div className="space-y-6">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto text-white animate-bounce shadow-lg">
              <Trophy size={48} />
            </div>
            <h2 className="font-serif text-4xl">Selamat! Omedetou!</h2>
            <p className="text-[var(--color-ink-light)]">Kamu telah LULUS {selectedLevel.title}.</p>
            
            {/* Certificate Style Box */}
            <div className={`py-8 border-y-2 border-dashed relative overflow-hidden rounded-xl mt-8 shadow-inner px-4 md:px-0`} style={{ borderColor: selectedCategory.themeColor, backgroundColor: 'var(--color-washi)' }}>
               <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none">
                 <Award size={150} className="rotate-12" />
               </div>
               
               {isFullCompletion ? (
                 <>
                   <div className="font-serif text-xl md:text-2xl mb-2 text-[var(--color-ink)]">SERTIFIKAT KELULUSAN TOTAL</div>
                   <div className="text-[10px] md:text-sm text-[var(--color-ink-light)] mb-4">Secara resmi telah menaklukkan seluruh tantangan:</div>
                   <div className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-2 tracking-wide text-balance" style={{ color: selectedCategory.themeColor }}>{selectedCategory.title}</div>
                   
                   <div className="my-6 p-4 bg-white/60 mx-4 rounded-xl border border-white/40 shadow-sm backdrop-blur-sm">
                     <div className="text-xs md:text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">🏆 Tema Hadiah Terbuka!</div>
                     <div className="text-base md:text-lg font-serif" style={{ color: selectedCategory.themeColor }}>{selectedCategory.themeReward}</div>
                   </div>
                 </>
               ) : (
                 <>
                   <div className="font-serif text-lg md:text-2xl mb-2 text-[var(--color-ink)]">SERTIFIKAT MODUL</div>
                   <div className="text-[10px] md:text-sm text-[var(--color-ink-light)] mb-4 px-2">Sertifikat ini diberikan secara bangga kepada:</div>
                   <div className="font-serif text-2xl md:text-4xl font-bold mb-4 tracking-wide text-gray-800">RANI HAYATI</div>
                   <div className="text-xs md:text-sm text-[var(--color-ink-light)] mb-2 px-4 md:px-6">Telah berhasil menguasai {selectedCategory.title} - {selectedLevel.title}.</div>
                 </>
               )}
               
               <div className="mt-4 font-bold text-green-700 bg-green-100 px-4 py-2 rounded-full inline-block text-[10px] md:text-sm">SKOR: {score}/{selectedLevel.questions.length} ({percentage}%) - LULUS</div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="w-24 h-24 bg-[var(--color-japan-red)] rounded-full flex items-center justify-center mx-auto text-white shadow-lg">
              <AlertCircle size={48} />
            </div>
            <h2 className="font-serif text-4xl">Sedikit Lagi!</h2>
            <p className="text-[var(--color-ink-light)]">Skor kamu {score}/{selectedLevel.questions.length} ({percentage}%). Kamu butuh {selectedLevel.passingScore}% untuk lulus.</p>
            <p className="text-sm italic">"Nanakorobi yaoki" — Jatuh tujuh kali, bangkit delapan kali.</p>
            <button 
              onClick={startQuiz}
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-[var(--color-ink)] text-white font-medium hover:bg-black transition-all mx-auto"
            >
              <RefreshCw size={18} /> Coba Lagi
            </button>
          </div>
        )}
        <button 
          onClick={backToLevels}
          className="text-sm font-medium text-[var(--color-ink-light)] hover:text-gray-800 transition-colors mt-6 inline-block underline underline-offset-4"
        >
          Kembali ke Kategori
        </button>
      </motion.div>
    );
  }

  const q = selectedLevel.questions[currentQuestion];

  const getCategoryIcon = (type: string) => {
    switch(type) {
      case 'listening': return <Headphones size={18} />;
      case 'reading': return <Eye size={18} />;
      case 'typing': return <Type size={18} />;
      default: return <BookOpen size={18} />;
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-[#E5E5E5]">
         <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[var(--color-japan-red)]">
           {getCategoryIcon(q.type)}
           {q.category}
         </div>
         <div className="text-xs font-mono font-medium text-[var(--color-ink-light)] bg-[var(--color-washi)] px-3 py-1 rounded-full">
           Soal {currentQuestion + 1} / {selectedLevel.questions.length}
         </div>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#E5E5E5] space-y-8">
        
        {/* Context / Reading Area */}
        {q.type === 'reading' && q.context && (
          <div className="bg-[#fcfbf9] rounded-2xl p-4 sm:p-6 border-l-4 border-[var(--color-matcha)] shadow-sm">
            <p className="text-lg sm:text-xl md:text-2xl font-jp leading-loose text-[var(--color-ink-light)]">
              {q.context}
            </p>
          </div>
        )}

        {/* Image Area */}
        {q.type === 'image' && q.imageUrl && (
          <div className="flex flex-col items-center justify-center space-y-4 py-6 bg-[#f8f9fa] rounded-2xl border border-dashed border-[#d1d5db]">
            <img src={q.imageUrl} alt="Pertanyaan" className="max-w-full h-auto max-h-64 object-contain rounded-xl shadow-sm" referrerPolicy="no-referrer" />
          </div>
        )}

        {/* Listening / Audio Area */}
        {q.type === 'listening' && q.spokenText && (
          <div className="flex flex-col items-center justify-center space-y-4 py-10 bg-[#f8f9fa] rounded-2xl border border-dashed border-[#d1d5db]">
            <button
              onClick={() => playAudio(q.spokenText!, q.speechLang)}
              className="w-20 h-20 bg-[var(--color-japan-red)] text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg hover:shadow-[var(--color-sakura-dark)]"
              title="Putar Audio Bahasa Jepang"
            >
              <Volume2 size={36} />
            </button>
            <p className="text-sm font-bold text-[var(--color-ink-light)] tracking-widest uppercase animate-pulse">Klik untuk Mendengar Audio</p>
          </div>
        )}

        {/* Question Text */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-center leading-relaxed">
          {q.question}
        </h2>

        {/* --- Options for Multiple Choice --- */}
        {(q.type === 'multiple-choice' || q.type === 'reading' || q.type === 'listening' || q.type === 'image') && q.options && (
          <div className="grid grid-cols-1 gap-4">
            {q.options.map((opt, idx) => {
               let colorClass = "border-[#E5E5E5] hover:border-[var(--color-japan-red)] hover:bg-[#fff9f9]";
               if (answered) {
                 const isCorrectOpt = Array.isArray(q.answer) ? q.answer.includes(opt) : opt === q.answer;
                 const isSelected = selectedAnswer === opt;
                 
                 if (isCorrectOpt) {
                   colorClass = "border-green-500 bg-green-50 text-green-800 ring-2 ring-green-200 font-bold";
                 } else if (isSelected) {
                   colorClass = "border-red-400 bg-red-50 text-red-700";
                 } else {
                   colorClass = "border-[#E5E5E5] opacity-40";
                 }
               }

               return (
                 <button
                   key={idx}
                   onClick={() => handleMultipleChoiceAnswer(opt)}
                   disabled={answered}
                   className={`w-full p-4 sm:p-5 rounded-2xl border-2 text-left transition-all duration-300 relative overflow-hidden ${colorClass}`}
                 >
                   <span className="text-base sm:text-lg pr-8 block">{opt}</span>
                   {answered && (Array.isArray(q.answer) ? q.answer.includes(opt) : opt === q.answer) && (
                     <span className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 text-green-500"><CheckCircle2 size={24} /></span>
                   )}
                   {answered && selectedAnswer === opt && !(Array.isArray(q.answer) ? q.answer.includes(opt) : opt === q.answer) && (
                     <span className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 text-red-500"><XCircle size={24} /></span>
                   )}
                 </button>
               );
            })}
          </div>
        )}

        {/* --- Input for Typing / Essay --- */}
        {q.type === 'typing' && (
          <div className="flex flex-col space-y-4 max-w-md mx-auto w-full">
            <div className={`flex bg-white border-2 rounded-2xl overflow-hidden transition-colors ${answered ? 'border-[#E5E5E5]' : 'border-[var(--color-ink-light)] focus-within:border-[var(--color-japan-red)]'}`}>
              <input
                type="text"
                value={typingInput}
                onChange={(e) => setTypingInput(e.target.value)}
                disabled={answered}
                placeholder="Ketik jawabanmu disini..."
                className="w-full px-6 py-4 outline-none font-medium text-lg disabled:bg-gray-50"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleTypingSubmit();
                }}
              />
              <button
                onClick={handleTypingSubmit}
                disabled={answered || !typingInput.trim()}
                className="px-6 bg-[var(--color-ink)] text-white hover:bg-[var(--color-japan-red)] disabled:opacity-50 disabled:hover:bg-[var(--color-ink)] transition-colors flex items-center justify-center"
                title="Kirim Jawaban"
              >
                <Send size={20} />
              </button>
            </div>
            
            {/* Typing Result Feedback */}
            {answered && (
              <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} className={`p-4 rounded-xl flex items-center gap-3 ${isTypingCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {isTypingCorrect ? (
                  <><CheckCircle2 size={24} /> <span className="font-bold text-lg">Jawaban Tepat!</span></>
                ) : (
                  <><XCircle size={24} /> <span className="font-bold text-lg">Kurang Tepat!</span></>
                )}
              </motion.div>
            )}
            
            {/* Show Correct Typing Answer */}
            {answered && !isTypingCorrect && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} className="p-4 bg-gray-50 rounded-xl border border-dashed border-[#ccc] text-center">
                <span className="text-sm text-gray-500 block mb-1">Jawaban yang benar:</span>
                <strong className="text-xl text-[var(--color-ink)]">
                   {Array.isArray(q.answer) ? q.answer.join(' / ') : q.answer}
                </strong>
              </motion.div>
            )}
          </div>
        )}

        {/* --- Post-Answer Explanation --- */}
        <AnimatePresence>
          {answered && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="space-y-6 pt-6 border-t border-[#F0F0F0] mt-6"
            >
              <div className="bg-[#FFF9E6] p-5 rounded-xl border border-[#F2E5B3]">
                <div className="font-bold text-[#8C6D1F] text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                  <BookOpen size={16} /> Penjelasan
                </div>
                <div className="text-sm text-[#735A1A] leading-relaxed">
                  {q.explanation}
                </div>
              </div>
              <button 
                onClick={nextQuestion}
                className="w-full py-4 rounded-xl bg-[var(--color-ink)] text-white font-bold hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] transition-all flex items-center justify-center gap-2 hover:-translate-y-1"
              >
                {currentQuestion === selectedLevel.questions.length - 1 ? 'Lihat Hasil Akhir' : 'Lanjut ke Pertanyaan Berikutnya'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

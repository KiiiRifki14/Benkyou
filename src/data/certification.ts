export type QuestionType = 'multiple-choice' | 'typing' | 'reading' | 'listening';

export interface CertificationQuestion {
  type: QuestionType;
  category: string;
  question: string;
  options?: string[];
  answer: string | string[];
  explanation: string;
  context?: string;
  spokenText?: string;
  speechLang?: string;
}

export interface CertificationLevel {
  id: number;
  title: string;
  description: string;
  passingScore: number;
  questions: CertificationQuestion[];
}

export interface CertificationCategory {
  id: string;
  title: string;
  description: string;
  levels: CertificationLevel[];
  themeReward: string;
  themeColor: string;
}

// Data pools for generating distinct questions deterministically
const n5GrammarPool = [
    { q: '私_____学生です。', options: ['は', 'が', 'を', 'に'], a: 'は', explanation: 'Partikel は (wa) menandakan subjek.' },
    { q: '犬_____います。', options: ['が', 'を', 'は', 'で'], a: 'が', explanation: 'Untuk keberadaan makhluk hidup gunakan がいます (ga imasu).' },
    { q: 'リンゴ_____食べます。', options: ['を', 'が', 'に', 'は'], a: 'を', explanation: 'Partikel を (wo) menandakan objek langsung.' },
    { q: '学校_____行きます。', options: ['へ', 'を', 'が', 'の'], a: 'へ', explanation: 'Partikel へ (he) menunjukkan arah tujuan.' },
    { q: 'これ_____ペンですか。', options: ['は', 'が', 'を', 'で'], a: 'は', explanation: 'Partikel は (wa) untuk menjelaskan ini adalah apa.' },
    { q: '机の上_____本があります。', options: ['に', 'で', 'を', 'へ'], a: 'に', explanation: 'Penunjuk lokasi keberadaan menggunakan partikel に (ni).' },
    { q: 'バス_____会社へ行きます。', options: ['で', 'に', 'を', 'が'], a: 'で', explanation: 'Alat transportasi/cara menggunakan partikel で (de).' },
    { q: 'あした_____休みです。', options: ['は', 'に', 'で', 'を'], a: 'は', explanation: 'Keterangan waktu bisa menjadi subjek kalimat dengan は.' },
    { q: 'コーヒー_____紅茶を飲みます。', options: ['か', 'は', 'が', 'で'], a: 'か', explanation: 'か (ka) di antara kata benda berarti "atau".' },
    { q: '昨日、何_____しましたか。', options: ['を', 'は', 'で', 'に'], a: 'を', explanation: 'Menjadikan "apa" sebagai objek dengan を (o).' }
];

const n5VocabList = [
    { kanji: '水', romaji: 'mizu', id: 'Air' }, { kanji: '車', romaji: 'kuruma', id: 'Mobil' }, { kanji: '山', romaji: 'yama', id: 'Gunung' },
    { kanji: '犬', romaji: 'inu', id: 'Anjing' }, { kanji: '猫', romaji: 'neko', id: 'Kucing' }, { kanji: '本', romaji: 'hon', id: 'Buku' },
    { kanji: '魚', romaji: 'sakana', id: 'Ikan' }, { kanji: '肉', romaji: 'niku', id: 'Daging' }, { kanji: '鳥', romaji: 'tori', id: 'Burung' },
    { kanji: '花', romaji: 'hana', id: 'Bunga' }, { kanji: '月', romaji: 'tsuki', id: 'Bulan' }, { kanji: '雨', romaji: 'ame', id: 'Hujan' },
    { kanji: '雪', romaji: 'yuki', id: 'Salju' }, { kanji: '川', romaji: 'kawa', id: 'Sungai' }, { kanji: '海', romaji: 'umi', id: 'Laut' },
    { kanji: '先生', romaji: 'sensei', id: 'Guru' }, { kanji: '学生', romaji: 'gakusei', id: 'Siswa' }, { kanji: '学校', romaji: 'gakkou', id: 'Sekolah' },
    { kanji: '時計', romaji: 'tokei', id: 'Jam' }, { kanji: '手紙', romaji: 'tegami', id: 'Surat' }
];

const n4GrammarPool = [
    { q: '写真を_____もいいですか。', options: ['撮って', '撮る', '撮った', '撮らない'], a: '撮って', explanation: '~te mo ii desu ka artinya bolehkah.' },
    { q: '雨が_____そうです。', options: ['降り', '降る', '降って', '降った'], a: '降り', explanation: 'Untuk prediksi cuaca, gunakan masu-stem + sou desu.' },
    { q: '日本へ_____ことがあります。', options: ['行った', '行く', '行って', '行かない'], a: '行った', explanation: 'Pengalaman menggunakan Ta-form + koto ga arimasu.' },
    { q: 'ここでタバコを_____はいけません。', options: ['吸って', '吸う', '吸った', '吸わない'], a: '吸って', explanation: '~te wa ikemasen artinya tidak boleh.' },
    { q: '先生は私に本を_____。', options: ['読ませました', '読みました', '読まれました', '読む'], a: '読ませました', explanation: 'Kausatif (menyuruh) menggunakan (s)eru.' },
    { q: 'ドアが_____います。', options: ['開いて', '開けて', '開く', '開ける'], a: '開いて', explanation: 'Intransitif + te imasu menunjukkan keadaan.' },
    { q: 'もっと勉強_____ほうがいいです。', options: ['した', 'する', 'して', 'しよう'], a: 'した', explanation: 'Saran menggunakan Ta-form + hou ga ii desu.' },
    { q: '明日、パーティーに_____つもりです。', options: ['行く', '行った', '行って', '行こう'], a: '行く', explanation: 'Niat menggunakan Kamus-form + tsumori desu.' },
    { q: '部屋を_____しました。', options: ['きれいに', 'きれいな', 'きれいだ', 'きれく'], a: 'きれいに', explanation: 'Kata sifat Na + ni shimasu (membuat jadi).' },
    { q: 'テストが難しい_____、できませんでした。', options: ['ので', 'か', 'のに', 'でも'], a: 'ので', explanation: 'node artinya karena (alasan objektif).' }
];

const n4VocabList = [
    { kanji: '地震', romaji: 'jishin', id: 'Gempa bumi' }, { kanji: '台風', romaji: 'taifuu', id: 'Angin topan' }, 
    { kanji: '約束', romaji: 'yakusoku', id: 'Janji' }, { kanji: '遠慮', romaji: 'enryo', id: 'Sungkan' },
    { kanji: '準備', romaji: 'junbi', id: 'Persiapan' }, { kanji: '復習', romaji: 'fukushuu', id: 'Mengulang pelajaran' },
    { kanji: '予習', romaji: 'yoshuu', id: 'Persiapan belajar' }, { kanji: '経験', romaji: 'keiken', id: 'Pengalaman' },
    { kanji: '事故', romaji: 'jiko', id: 'Kecelakaan' }, { kanji: '故障', romaji: 'koshou', id: 'Rusak' }
];

const n3GrammarPool = [
    { q: '彼は今、家にいる_____です。', options: ['はず', 'べき', 'つもり', 'わけ'], a: 'はず', explanation: 'hazu desu menunjukkan keyakinan tinggi.' },
    { q: '風邪を引いた_____、学校を休んだ。', options: ['ため', 'のに', 'さえ', 'まで'], a: 'ため', explanation: 'tame berarti karena/sebab.' },
    { q: 'あんな高いもの、買える_____。', options: ['わけがない', 'はずがない', 'ことだ', 'A dan B benar'], a: 'A dan B benar', explanation: 'Keduanya bisa berarti tidak mungkin.' },
    { q: 'このケーキは甘_____て、食べられない。', options: ['すぎ', 'そう', 'らしい', 'みたい'], a: 'すぎ', explanation: 'sugi (terlalu) menjadi sugite.' },
    { q: '彼に_____、この問題は簡単だろう。', options: ['とって', 'ついて', '対して', 'よって'], a: 'とって', explanation: '~ni totte artinya bagi seseorang.' },
    { q: '雨が降っている_____、出かけましょう。', options: ['けれど', 'だから', 'から', 'ので'], a: 'けれど', explanation: 'keredo artinya meskipun.' },
    { q: 'そんなことを言う_____じゃない。', options: ['べき', 'はず', 'もの', 'こと'], a: 'べき', explanation: 'beki ja nai artinya tidak seharusnya.' },
    { q: '疲れた_____、少し休もう。', options: ['から', 'のに', 'くせに', 'かわりに'], a: 'から', explanation: 'kara artinya karena (alasan subjektif).' },
    { q: '彼は来る_____こない_____、始めるよ。', options: ['にしろ / にしろ', 'だの / だの', 'か / か', 'なり / なり'], a: 'にしろ / にしろ', explanation: 'ni shiro... artinya baik... maupun tidak.' },
    { q: '先生のおかげ_____、合格できました。', options: ['で', 'に', 'を', 'が'], a: 'で', explanation: 'okage de artinya berkat.' }
];

const n3VocabList = [
    { kanji: '環境', romaji: 'kankyou', id: 'Lingkungan' }, { kanji: '資源', romaji: 'shigen', id: 'Sumber daya' }, 
    { kanji: '影響', romaji: 'eikyou', id: 'Pengaruh' }, { kanji: '原因', romaji: 'genin', id: 'Penyebab' },
    { kanji: '結果', romaji: 'kekka', id: 'Hasil' }, { kanji: '問題', romaji: 'mondai', id: 'Masalah' },
    { kanji: '解決', romaji: 'kaiketsu', id: 'Penyelesaian' }, { kanji: '協力', romaji: 'kyouryoku', id: 'Kerjasama' },
    { kanji: '努力', romaji: 'doryoku', id: 'Usaha' }, { kanji: '成功', romaji: 'seikou', id: 'Kesuksesan' },
    { kanji: '知識', romaji: 'chishiki', id: 'Pengetahuan' }, { kanji: '状態', romaji: 'joutai', id: 'Kondisi' },
    { kanji: '表現', romaji: 'hyougen', id: 'Ekspresi' }, { kanji: '発見', romaji: 'hakken', id: 'Penemuan' },
    { kanji: '発達', romaji: 'hattatsu', id: 'Perkembangan' }
];

const n2GrammarPool = [
    { q: '天気に_____、予定を変更します。', options: ['よって', 'ついて', '対して', 'とって'], a: 'よって', explanation: '~ni yotte berarti tergantung pada.' },
    { q: '忙しい_____、つい忘れてしまった。', options: ['あまり', 'だけ', 'からには', 'ことか'], a: 'あまり', explanation: 'amari berarti saking (berlebihan).' },
    { q: '言った_____、責任を取りなさい。', options: ['からには', 'おかげで', 'せいか', 'うえで'], a: 'からには', explanation: 'kara ni wa berarti karena sudah (maka harus).' },
    { q: '話し合いの_____、決定します。', options: ['うえで', 'したで', 'なかで', 'あとで'], a: 'うえで', explanation: 'ue de berarti setelah melakukan sesuatu.' },
    { q: '彼は知っている_____、教えてくれない。', options: ['くせに', 'からに', 'ゆえに', 'がてら'], a: 'くせに', explanation: 'kuse ni berarti padahal (bernuansa negatif).' },
    { q: 'お金がない_____、旅行をあきらめた。', options: ['ゆえに', 'だけあって', 'からして', 'にすぎない'], a: 'ゆえに', explanation: 'yue ni berarti oleh karena (formal).' },
    { q: 'あの人の話し方_____、怒っているようだ。', options: ['からして', 'からすると', 'からには', 'A dan B'], a: 'A dan B', explanation: 'kara shite / kara suru to berarti dilihat dari.' },
    { q: '努力した_____、成功するわけではない。', options: ['からといって', 'からには', 'からして', 'からこそ'], a: 'からといって', explanation: 'kara to itte berarti hanya karena... (belum tentu).' },
    { q: '彼を_____、この仕事はできない。', options: ['ぬきにして', 'ともかく', 'はざておき', 'かぎりに'], a: 'ぬきにして', explanation: 'nuki ni shite berarti tanpa (dia).' },
    { q: '病気_____、無理をしないでください。', options: ['がちだから', 'ぎみだから', 'だらけだから', 'っぽいだから'], a: 'ぎみだから', explanation: 'gimi berarti agak/gejala.' }
];

const n2VocabList = [
    { kanji: '矛盾', romaji: 'mujun', id: 'Kontradiksi' }, { kanji: '把握', romaji: 'haaku', id: 'Memahami' }, 
    { kanji: '検討', romaji: 'kentou', id: 'Pertimbangan' }, { kanji: '妥協', romaji: 'dakyou', id: 'Kompromi' },
    { kanji: '貢献', romaji: 'kouken', id: 'Kontribusi' }, { kanji: '犠牲', romaji: 'gisei', id: 'Pengorbanan' },
    { kanji: '錯覚', romaji: 'sakkaku', id: 'Ilusi/Salah sangka' }, { kanji: '頻繁', romaji: 'hinpan', id: 'Sering' },
    { kanji: '柔軟', romaji: 'juunan', id: 'Fleksibel' }, { kanji: '慎重', romaji: 'shinchou', id: 'Hati-hati' },
    { kanji: '詳細', romaji: 'shousai', id: 'Detail' }, { kanji: '偶然', romaji: 'guuzen', id: 'Kebetulan' }
];

const n1GrammarPool = [
    { q: 'これ_____、本日の会議を終了します。', options: ['をもちまして', 'にあたって', 'をかわきりに', 'にそくして'], a: 'をもちまして', explanation: 'o mochimashite = dengan ini (formal).' },
    { q: '努力の賜物_____。', options: ['にほかならない', 'とはかぎらない', 'になりかねない', 'にすぎない'], a: 'にほかならない', explanation: 'ni hoka naranai = tidak lain adalah.' },
    { q: '彼は経営者_____、研究者でもある。', options: ['にして', 'たるもの', 'であれ', 'とあって'], a: 'にして', explanation: 'ni shite = sekaligus.' },
    { q: '承認を_____、実行できない。', options: ['経ることなしに', '経たうえで', '経たからには', '経ずして'], a: '経ることなしに', explanation: 'heru koto nashi ni = tanpa melalui.' },
    { q: 'あんな事を言う_____。', options: ['まじきことだ', 'べからざることだ', 'A dan B', 'はずがない'], a: 'A dan B', explanation: 'majiki / bekarazaru = tidak pantas/tidak boleh.' },
    { q: '雨_____、試合は続行された。', options: ['をものともせず', 'をよそに', 'をかわきりに', 'をめぐって'], a: 'をものともせず', explanation: 'o mono to mo sezu = tanpa menghiraukan.' },
    { q: '親の期待_____、遊び呆けている。', options: ['をよそに', 'にこたえて', 'にそって', 'にふまえて'], a: 'をよそに', explanation: 'o yoso ni = mengabaikan.' },
    { q: 'あの政治家の言葉は、嘘_____。', options: ['まみれだ', 'だらけだ', 'ずくめだ', 'っぷりだ'], a: 'まみれだ', explanation: 'mamire / darake = penuh dengan (hal buruk).' },
    { q: '彼のこと_____、また遅刻するだろう。', options: ['だから', 'ゆえに', 'からして', 'とはいえ'], a: 'だから', explanation: 'dakara = karena karakternya begitu.' },
    { q: '知っていた_____、言えなかった。', options: ['とはいえ', 'からには', 'ばかりに', 'ところで'], a: 'とはいえ', explanation: 'to wa ie = meskipun demikian.' }
];

const n1VocabList = [
    { kanji: '隠蔽', romaji: 'inpei', id: 'Penyembunyian' }, { kanji: '払拭', romaji: 'fusshoku', id: 'Menghilangkan' }, 
    { kanji: '懸念', romaji: 'kenen', id: 'Kekhawatiran' }, { kanji: '推進', romaji: 'suishin', id: 'Pendorong' },
    { kanji: '撤回', romaji: 'tekkai', id: 'Penarikan' }, { kanji: '模索', romaji: 'mosaku', id: 'Meraba-raba/Mencari' },
    { kanji: '誘発', romaji: 'yuuhatsu', id: 'Memicu' }, { kanji: '逸脱', romaji: 'itsudatsu', id: 'Penyimpangan' },
    { kanji: '踏襲', romaji: 'toushuu', id: 'Mengikuti jejak' }, { kanji: '網羅', romaji: 'moura', id: 'Mencakup semua' },
    { kanji: '喚起', romaji: 'kanki', id: 'Membangkitkan' }, { kanji: '駆使', romaji: 'kushi', id: 'Menggunakan dengan bebas' }
];

// Helper functions for programmatic generation
// We seed this locally so it remains constant per reload but distinct per level

function shuffleSeed(array: any[], initialSeed: number) {
    let result = [...array];
    let currentSeed = initialSeed || 1;
    function nextRng() {
        let x = Math.sin(currentSeed++) * 10000;
        return x - Math.floor(x);
    }
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(nextRng() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

function generateLevelQuestions(grammarPool: any[], vocabList: any[], count: number, seed: number): CertificationQuestion[] {
    let questions: CertificationQuestion[] = [];
    
    // Combine all available items
    let allItems = [
        ...vocabList.map(v => ({ type: 'vocab', data: v })),
        ...grammarPool.map(g => ({ type: 'grammar', data: g }))
    ];
    
    // Shuffle all items using the seed
    let shuffledItems = shuffleSeed(allItems, seed);
    
    // If count > available items, we'll wrap around, but for small counts like 10, we have 30 items so it's fine.
    // Pick the first `count` unique items for this level
    let selectedItems = shuffledItems.slice(0, count);
    
    let qSeed = seed * 100;
    
    selectedItems.forEach((item, index) => {
        let rng = Math.abs(Math.sin(qSeed++)) * 10000;
        rng = rng - Math.floor(rng);
        
        if (item.type === 'vocab') {
            const word = item.data;
            const variation = Math.floor(rng * 4); // 0 to 3
            
            const wrong = shuffleSeed(vocabList, qSeed++).filter((v:any) => v.kanji !== word.kanji);
            
            if (variation === 0) {
                questions.push({
                    type: 'multiple-choice',
                    category: 'Vocabulary',
                    question: `Apa romanisasi dari "${word.kanji}"?`,
                    options: shuffleSeed([word.romaji, wrong[0].romaji, wrong[1].romaji, wrong[2].romaji], qSeed++),
                    answer: word.romaji,
                    explanation: `"${word.kanji}" dibaca ${word.romaji}.`
                });
            } else if (variation === 1) {
                questions.push({
                    type: 'multiple-choice',
                    category: 'Vocabulary',
                    question: `Apa arti dari "${word.kanji}"?`,
                    options: shuffleSeed([word.id, wrong[0].id, wrong[1].id, wrong[2].id], qSeed++),
                    answer: word.id,
                    explanation: `${word.kanji} (${word.romaji}) artinya adalah ${word.id}.`
                });
            } else if (variation === 2) {
                questions.push({
                    type: 'typing',
                    category: 'Kanji',
                    question: `Ketik dalam romaji cara baca "${word.kanji}":`,
                    answer: [word.romaji, word.romaji.toLowerCase()],
                    explanation: `Kanji ${word.kanji} dibaca ${word.romaji}.`
                });
            } else {
                questions.push({
                    type: 'reading',
                    category: 'Reading',
                    context: `「あの${word.kanji}はどうですか？」\n「とても良いと思います。」`,
                    question: `Hal apa yang sedang dibicarakan?`,
                    options: shuffleSeed([word.id, wrong[0].id, wrong[1].id, wrong[2].id], qSeed++),
                    answer: word.id,
                    explanation: `Konteks membicarakan ${word.kanji} yang artinya ${word.id}.`
                });
            }
            
        } else {
            const g = item.data;
            const variation = Math.floor(rng * 3); // 0 to 2
            
            if (variation === 0) {
                questions.push({
                    type: 'multiple-choice',
                    category: 'Grammar',
                    question: `Lengkapi kalimat berikut:\n${g.q}`,
                    options: shuffleSeed([...g.options], qSeed++),
                    answer: g.a,
                    explanation: g.explanation
                });
            } else if (variation === 1) {
                const wrongL = shuffleSeed(grammarPool, qSeed++).filter((v:any) => v.a !== g.a).map((v:any) => v.a);
                // Ensure we have enough wrong options
                const validWrongL = wrongL.length >= 3 ? wrongL : ['A', 'B', 'C'];
                questions.push({
                    type: 'listening',
                    category: 'Listening',
                    question: `Dengarkan kalimat berikut. Kata apa yang tepat untuk mengisi kekosongan (jeda)?`,
                    spokenText: g.q.replace('_____', '...'),
                    speechLang: 'ja-JP',
                    options: shuffleSeed([g.a, validWrongL[0], validWrongL[1], validWrongL[2]], qSeed++),
                    answer: g.a,
                    explanation: `Kalimat yang benar adalah: ${g.q.replace('_____', g.a)}`
                });
            } else {
                const wrongRG = shuffleSeed(grammarPool, qSeed++).filter((v:any) => v.a !== g.a).map((v:any) => v.a);
                const validWrongRG = wrongRG.length >= 3 ? wrongRG : ['A', 'B', 'C'];
                questions.push({
                    type: 'reading',
                    category: 'Reading',
                    context: `${g.q.replace('_____', g.a)}`,
                    question: `Identifikasi pola kalimat / partikel utama yang ditekankan dalam struktur kalimat di atas:`,
                    options: shuffleSeed([g.a, validWrongRG[0], validWrongRG[1], validWrongRG[2]], qSeed++),
                    answer: g.a,
                    explanation: g.explanation
                });
            }
        }
    });
    
    return questions;
}

function generateLevelsConfig(totalLevels: number, countPerLevel: number, prefix: string, grammarPool: any[], vocabList: any[]): CertificationLevel[] {
    let levels: CertificationLevel[] = [];
    
    for (let i = 1; i <= totalLevels; i++) {
        let seed = prefix.charCodeAt(1) * 100 + i * 10;
        let levelQuestions = generateLevelQuestions(grammarPool, vocabList, countPerLevel, seed);

        levels.push({
            id: i,
            title: `${prefix} Level ${i}`,
            description: `Ujian ${prefix} Level ${i} - Terdiri dari ${countPerLevel} soal bacaan, huruf, dan tatabahasa.`,
            passingScore: 70,
            questions: levelQuestions
        });
    }
    return levels;
}

const n5Levels = generateLevelsConfig(10, 10, 'N5', n5GrammarPool, n5VocabList);
const n4Levels = generateLevelsConfig(10, 10, 'N4', n4GrammarPool, n4VocabList);
const n3Levels = generateLevelsConfig(8, 10, 'N3', n3GrammarPool, n3VocabList);
const n2Levels = generateLevelsConfig(6, 10, 'N2', n2GrammarPool, n2VocabList);
const n1Levels = generateLevelsConfig(5, 10, 'N1', n1GrammarPool, n1VocabList);

export const certificationCategories: CertificationCategory[] = [
  {
    id: 'n5',
    title: 'JLPT N5 (Dasar)',
    description: 'Level paling dasar. Tersedia 10 Level komprehensif. Lulus semua ujian untuk tema bunga Sakura!',
    themeReward: 'Sakura Theme',
    themeColor: 'var(--color-japan-red)',
    levels: n5Levels
  },
  {
    id: 'n4',
    title: 'JLPT N4 (Lanjutan Dasar)',
    description: 'Berisi grammar perbandingan dan pasif. Tersedia 10 Level. Tema Hadiah: Matcha Latté!',
    themeReward: 'Matcha Theme',
    themeColor: 'var(--color-matcha)',
    levels: n4Levels
  },
  {
    id: 'n3',
    title: 'JLPT N3 (Menengah)',
    description: 'Bentuk kausatif pasif dan bacaan sedang. Tersedia 8 Level menantang. Tema Hadiah: Gunung Fuji.',
    themeReward: 'Gunung Fuji Theme',
    themeColor: 'var(--color-bamboo)',
    levels: n3Levels
  },
  {
    id: 'n2',
    title: 'JLPT N2 (Lanjutan Menengah)',
    description: 'Bahasa koran dan bisnis. Tersedia 6 Level. Tema Hadiah: Musim Gugur Theme',
    themeReward: 'Autumn Theme',
    themeColor: '#4A90E2',
    levels: n2Levels
  },
  {
    id: 'n1',
    title: 'JLPT N1 (Lancar/Mahir)',
    description: 'Ujian tersulit. Sastra, politik, surat resmi. Tersedia 5 Level. Tema Hadiah: Midnight Theme',
    themeReward: 'Midnight Theme',
    themeColor: '#FFC107',
    levels: n1Levels
  }
];

export type QuestionType =
    | "multiple-choice"
    | "typing"
    | "reading"
    | "listening";

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
    {
        q: "私_____学生です。",
        options: ["は", "が", "を", "に"],
        a: "は",
        explanation: "Partikel は (wa) menandakan subjek.",
    },
    {
        q: "犬_____います。",
        options: ["が", "を", "は", "で"],
        a: "が",
        explanation:
            "Untuk keberadaan makhluk hidup gunakan がいます (ga imasu).",
    },
    {
        q: "リンゴ_____食べます。",
        options: ["を", "が", "に", "は"],
        a: "を",
        explanation: "Partikel を (wo) menandakan objek langsung.",
    },
    {
        q: "学校_____行きます。",
        options: ["へ", "を", "が", "の"],
        a: "へ",
        explanation: "Partikel へ (he) menunjukkan arah tujuan.",
    },
    {
        q: "これ_____ペンですか。",
        options: ["は", "が", "を", "で"],
        a: "は",
        explanation: "Partikel は (wa) untuk menjelaskan ini adalah apa.",
    },
    {
        q: "机の上_____本があります。",
        options: ["に", "で", "を", "へ"],
        a: "に",
        explanation: "Penunjuk lokasi keberadaan menggunakan partikel に (ni).",
    },
    {
        q: "バス_____会社へ行きます。",
        options: ["で", "に", "を", "が"],
        a: "で",
        explanation: "Alat transportasi/cara menggunakan partikel で (de).",
    },
    {
        q: "あした_____休みです。",
        options: ["は", "に", "で", "を"],
        a: "は",
        explanation: "Keterangan waktu bisa menjadi subjek kalimat dengan は.",
    },
    {
        q: "コーヒー_____紅茶を飲みます。",
        options: ["か", "は", "が", "で"],
        a: "か",
        explanation: 'か (ka) di antara kata benda berarti "atau".',
    },
    {
        q: "昨日、何_____しましたか。",
        options: ["を", "は", "で", "に"],
        a: "を",
        explanation: 'Menjadikan "apa" sebagai objek dengan を (o).',
    },
];

const n5VocabList = [
    { kanji: "水", romaji: "mizu", id: "Air" },
    { kanji: "車", romaji: "kuruma", id: "Mobil" },
    { kanji: "山", romaji: "yama", id: "Gunung" },
    { kanji: "犬", romaji: "inu", id: "Anjing" },
    { kanji: "猫", romaji: "neko", id: "Kucing" },
    { kanji: "本", romaji: "hon", id: "Buku" },
    { kanji: "魚", romaji: "sakana", id: "Ikan" },
    { kanji: "肉", romaji: "niku", id: "Daging" },
    { kanji: "鳥", romaji: "tori", id: "Burung" },
    { kanji: "花", romaji: "hana", id: "Bunga" },
    { kanji: "月", romaji: "tsuki", id: "Bulan" },
    { kanji: "雨", romaji: "ame", id: "Hujan" },
    { kanji: "雪", romaji: "yuki", id: "Salju" },
    { kanji: "川", romaji: "kawa", id: "Sungai" },
    { kanji: "海", romaji: "umi", id: "Laut" },
    { kanji: "先生", romaji: "sensei", id: "Guru" },
    { kanji: "学生", romaji: "gakusei", id: "Siswa" },
    { kanji: "学校", romaji: "gakkou", id: "Sekolah" },
    { kanji: "時計", romaji: "tokei", id: "Jam" },
    { kanji: "手紙", romaji: "tegami", id: "Surat" },
];

const n4GrammarPool = [
    {
        q: "写真を_____もいいですか。",
        options: ["撮って", "撮る", "撮った", "撮らない"],
        a: "撮って",
        explanation: "~te mo ii desu ka artinya bolehkah.",
    },
    {
        q: "雨が_____そうです。",
        options: ["降り", "降る", "降って", "降った"],
        a: "降り",
        explanation: "Untuk prediksi cuaca, gunakan masu-stem + sou desu.",
    },
    {
        q: "日本へ_____ことがあります。",
        options: ["行った", "行く", "行って", "行かない"],
        a: "行った",
        explanation: "Pengalaman menggunakan Ta-form + koto ga arimasu.",
    },
    {
        q: "ここでタバコを_____はいけません。",
        options: ["吸って", "吸う", "吸った", "吸わない"],
        a: "吸って",
        explanation: "~te wa ikemasen artinya tidak boleh.",
    },
    {
        q: "先生は私に本を_____。",
        options: ["読ませました", "読みました", "読まれました", "読む"],
        a: "読ませました",
        explanation: "Kausatif (menyuruh) menggunakan (s)eru.",
    },
    {
        q: "ドアが_____います。",
        options: ["開いて", "開けて", "開く", "開ける"],
        a: "開いて",
        explanation: "Intransitif + te imasu menunjukkan keadaan.",
    },
    {
        q: "もっと勉強_____ほうがいいです。",
        options: ["した", "する", "して", "しよう"],
        a: "した",
        explanation: "Saran menggunakan Ta-form + hou ga ii desu.",
    },
    {
        q: "明日、パーティーに_____つもりです。",
        options: ["行く", "行った", "行って", "行こう"],
        a: "行く",
        explanation: "Niat menggunakan Kamus-form + tsumori desu.",
    },
    {
        q: "部屋を_____しました。",
        options: ["きれいに", "きれいな", "きれいだ", "きれく"],
        a: "きれいに",
        explanation: "Kata sifat Na + ni shimasu (membuat jadi).",
    },
    {
        q: "テストが難しい_____、できませんでした。",
        options: ["ので", "か", "のに", "でも"],
        a: "ので",
        explanation: "node artinya karena (alasan objektif).",
    },
];

const n4VocabList = [
    { kanji: "地震", romaji: "jishin", id: "Gempa bumi" },
    { kanji: "台風", romaji: "taifuu", id: "Angin topan" },
    { kanji: "約束", romaji: "yakusoku", id: "Janji" },
    { kanji: "遠慮", romaji: "enryo", id: "Sungkan" },
    { kanji: "準備", romaji: "junbi", id: "Persiapan" },
    { kanji: "復習", romaji: "fukushuu", id: "Mengulang pelajaran" },
    { kanji: "予習", romaji: "yoshuu", id: "Persiapan belajar" },
    { kanji: "経験", romaji: "keiken", id: "Pengalaman" },
    { kanji: "事故", romaji: "jiko", id: "Kecelakaan" },
    { kanji: "故障", romaji: "koshou", id: "Rusak" },
];

const n3GrammarPool = [
    {
        q: "彼は今、家にいる_____です。",
        options: ["はず", "べき", "つもり", "わけ"],
        a: "はず",
        explanation: "hazu desu menunjukkan keyakinan tinggi.",
    },
    {
        q: "風邪を引いた_____、学校を休んだ。",
        options: ["ため", "のに", "さえ", "まで"],
        a: "ため",
        explanation: "tame berarti karena/sebab.",
    },
    {
        q: "あんな高いもの、買える_____。",
        options: ["わけがない", "はずがない", "ことだ", "A dan B benar"],
        a: "A dan B benar",
        explanation: "Keduanya bisa berarti tidak mungkin.",
    },
    {
        q: "このケーキは甘_____て、食べられない。",
        options: ["すぎ", "そう", "らしい", "みたい"],
        a: "すぎ",
        explanation: "sugi (terlalu) menjadi sugite.",
    },
    {
        q: "彼に_____、この問題は簡単だろう。",
        options: ["とって", "ついて", "対して", "よって"],
        a: "とって",
        explanation: "~ni totte artinya bagi seseorang.",
    },
    {
        q: "雨が降っている_____、出かけましょう。",
        options: ["けれど", "だから", "から", "ので"],
        a: "けれど",
        explanation: "keredo artinya meskipun.",
    },
    {
        q: "そんなことを言う_____じゃない。",
        options: ["べき", "はず", "もの", "こと"],
        a: "べき",
        explanation: "beki ja nai artinya tidak seharusnya.",
    },
    {
        q: "疲れた_____、少し休もう。",
        options: ["から", "のに", "くせに", "かわりに"],
        a: "から",
        explanation: "kara artinya karena (alasan subjektif).",
    },
    {
        q: "彼は来る_____こない_____、始めるよ。",
        options: ["にしろ / にしろ", "だの / だの", "か / か", "なり / なり"],
        a: "にしろ / にしろ",
        explanation: "ni shiro... artinya baik... maupun tidak.",
    },
    {
        q: "先生のおかげ_____、合格できました。",
        options: ["で", "に", "を", "が"],
        a: "で",
        explanation: "okage de artinya berkat.",
    },
];

const n3VocabList = [
    { kanji: "環境", romaji: "kankyou", id: "Lingkungan" },
    { kanji: "資源", romaji: "shigen", id: "Sumber daya" },
    { kanji: "影響", romaji: "eikyou", id: "Pengaruh" },
    { kanji: "原因", romaji: "genin", id: "Penyebab" },
    { kanji: "結果", romaji: "kekka", id: "Hasil" },
    { kanji: "問題", romaji: "mondai", id: "Masalah" },
    { kanji: "解決", romaji: "kaiketsu", id: "Penyelesaian" },
    { kanji: "協力", romaji: "kyouryoku", id: "Kerjasama" },
    { kanji: "努力", romaji: "doryoku", id: "Usaha" },
    { kanji: "成功", romaji: "seikou", id: "Kesuksesan" },
    { kanji: "知識", romaji: "chishiki", id: "Pengetahuan" },
    { kanji: "状態", romaji: "joutai", id: "Kondisi" },
    { kanji: "表現", romaji: "hyougen", id: "Ekspresi" },
    { kanji: "発見", romaji: "hakken", id: "Penemuan" },
    { kanji: "発達", romaji: "hattatsu", id: "Perkembangan" },
];

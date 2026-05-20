export const grammar = [
    {
        id: 1,
        title: "A は B です (A wa B desu)",
        description:
            'Ini adalah struktur kalimat paling dasar dalam bahasa Jepang. Artinya "A adalah B".',
        examples: [
            {
                jp: "私は学生です。",
                romaji: "Watashi wa gakusei desu.",
                en: "Saya adalah seorang siswa.",
            },
            {
                jp: "これはペンです。",
                romaji: "Kore wa pen desu.",
                en: "Ini adalah sebuah pulpen.",
            },
        ],
        notes: 'Partikel は ditulis dengan hiragana "ha" tetapi diucapkan sebagai "wa".',
    },
    {
        id: 2,
        title: "A は B じゃありません (A wa B ja arimasen)",
        description:
            'Ini adalah bentuk negatif dari "A wa B desu". Artinya "A bukan B".',
        examples: [
            {
                jp: "私は先生じゃありません。",
                romaji: "Watashi wa sensei ja arimasen.",
                en: "Saya bukan seorang guru.",
            },
            {
                jp: "それは猫じゃありません。",
                romaji: "Sore wa neko ja arimasen.",
                en: "Itu bukan seekor kucing.",
            },
        ],
        notes: '"ja arimasen" umum digunakan dalam percakapan sehari-hari. "dewa arimasen" lebih formal.',
    },
    {
        id: 3,
        title: "A は B ですか (A wa B desu ka)",
        description:
            'Untuk mengubah kalimat menjadi pertanyaan, cukup tambahkan "ka" di akhir.',
        examples: [
            {
                jp: "あなたは学生ですか。",
                romaji: "Anata wa gakusei desu ka.",
                en: "Apakah Anda seorang siswa?",
            },
            {
                jp: "あれは犬ですか。",
                romaji: "Are wa inu desu ka.",
                en: "Apakah itu seekor anjing?",
            },
        ],
        notes: 'Bahasa Jepang tidak selalu membutuhkan tanda tanya (?), partikel "ka" sudah berfungsi sebagai tanda tanya.',
    },
    {
        id: 4,
        title: "A の B (A no B)",
        description:
            'Partikel "no" (の) digunakan untuk menunjukkan kepemilikan, atau menghubungkan dua kata benda. Artinya "B milik A" atau "B dari/berkaitan dengan A".',
        examples: [
            {
                jp: "私の本です。",
                romaji: "Watashi no hon desu.",
                en: "Ini adalah buku saya.",
            },
            {
                jp: "日本語の先生。",
                romaji: "Nihongo no sensei.",
                en: "Guru bahasa Jepang.",
            },
        ],
        notes: 'Urutannya terbalik dari bahasa Indonesia. "Buku saya" menjadi "Saya (の) Buku".',
    },
    {
        id: 5,
        title: "Kata Kerja Bentuk ~ます (~masu)",
        description:
            "Bentuk ~masu digunakan untuk membuat kata kerja menjadi sopan (formal). Digunakan saat berbicara dengan orang yang tidak terlalu akrab atau atasan.",
        examples: [
            {
                jp: "私はりんごを食べます。",
                romaji: "Watashi wa ringo o tabemasu.",
                en: "Saya makan apel.",
            },
            {
                jp: "毎日学校へ行きます。",
                romaji: "Mainichi gakkou e ikimasu.",
                en: "Setiap hari pergi ke sekolah.",
            },
        ],
        notes: "Partikel を (wo) digunakan untuk objek, dan へ (he/e) digunakan untuk arah/tujuan.",
    },
    {
        id: 6,
        title: "Kata Kerja Bentuk Negatif ~ません (~masen)",
        description:
            'Bentuk ~masen adalah bentuk negatif sopan dari ~masu. Artinya "tidak melakukan (suatu aktivitas)".',
        examples: [
            {
                jp: "肉を食べません。",
                romaji: "Niku o tabemasen.",
                en: "Tidak makan daging.",
            },
            {
                jp: "テレビを見ません。",
                romaji: "Terebi o mimasen.",
                en: "Tidak menonton TV.",
            },
        ],
        notes: 'Untuk masa lampau negatif, tambahkan "deshita" menjadi ~masen deshita (tidak melakukan di masa lalu).',
    },
    {
        id: 7,
        title: "A に B があります/います (A ni B ga arimasu/imasu)",
        description:
            'Pola ini digunakan untuk menyatakan keberadaan benda atau makhluk hidup di suatu tempat. "arimasu" untuk benda mati, "imasu" untuk makhluk hidup.',
        examples: [
            {
                jp: "部屋にベッドがあります。",
                romaji: "Heya ni beddo ga arimasu.",
                en: "Ada tempat tidur di kamar.",
            },
            {
                jp: "庭に犬がいます。",
                romaji: "Niwa ni inu ga imasu.",
                en: "Ada anjing di halaman.",
            },
        ],
        notes: "Gunakan partikel に (ni) untuk menunjukkan tempat keberadaan.",
    },
    {
        id: 8,
        title: "Kata Kerja Bentuk ~たいです (~tai desu)",
        description:
            'Bentuk ~tai digunakan untuk mengungkapkan keinginan melakukan sesuatu. Artinya "Ingin melakukan...".',
        examples: [
            {
                jp: "日本へ行きたいです。",
                romaji: "Nihon e ikitai desu.",
                en: "Ingin pergi ke Jepang.",
            },
            {
                jp: "寿司を食べたいです。",
                romaji: "Sushi o tabetai desu.",
                en: "Ingin makan sushi.",
            },
        ],
        notes: "Ubah akhiran ~masu menjadi ~tai desu (misal: tabemasu -> tabetai desu).",
    },
];

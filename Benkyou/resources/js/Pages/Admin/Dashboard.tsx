import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    Users,
    CheckCircle,
    Book,
    Award,
    Eye,
    Search,
    TrendingUp,
    Plus,
    X,
    ChevronLeft,
    ChevronRight,
    PenTool,
    Languages,
    List,
    BookOpen,
    FileQuestion,
    GraduationCap,
    Sparkles,
    ShieldCheck,
    LayoutTemplate,
    Activity,
} from "lucide-react";
import Layout from "@/Components/Layout";
import { Link, usePage } from "@inertiajs/react";

interface UserProgress {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
    quizzes: {
        id: number;
        score: number;
        total: number;
        category: string;
        created_at: string;
    }[];
    notes: { id: number; date: string; content: string }[];
    certifications: {
        id: number;
        category: string;
        level: number;
        passed: boolean;
        score: number;
    }[];
}

interface DashboardProps {
    usersData: UserProgress[];
    stats: {
        totalUsers: number;
        totalQuizzes: number;
        totalNotes: number;
        totalCertifications: number;
    };
}

const ROWS_PER_PAGE = 10;

export default function Dashboard({ usersData = [], stats }: DashboardProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState<UserProgress | null>(null);
    const [activeModalTab, setActiveModalTab] = useState<
        "quizzes" | "notes" | "certifications"
    >("quizzes");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredUsers = usersData.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const totalPages = Math.max(
        1,
        Math.ceil(filteredUsers.length / ROWS_PER_PAGE),
    );
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * ROWS_PER_PAGE,
        currentPage * ROWS_PER_PAGE,
    );

    const handleSearch = (val: string) => {
        setSearchTerm(val);
        setCurrentPage(1);
    };

    const getInitials = (name: string) => {
        if (!name) return "B";
        const parts = name.trim().split(" ");
        if (parts.length === 1) return parts[0][0].toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    const statCards = [
        {
            label: "Total Pelajar Aktif",
            value: stats?.totalUsers ?? 0,
            sublabel: "Cohort N5 - N1 Aktif",
            growth: "+14.8%",
            icon: Users,
            color: "text-[#c73e3a]",
            badgeBg: "bg-[#fff0ef] text-[#c73e3a]",
            iconBg: "bg-[#fff0ef]",
        },
        {
            label: "Latihan & Quiz Selesai",
            value: stats?.totalQuizzes ?? 0,
            sublabel: "Akurasi Rerata 82%",
            growth: "Aktif",
            icon: CheckCircle,
            color: "text-[#326040]",
            badgeBg: "bg-[#d0ffd8] text-[#00210d]",
            iconBg: "bg-[#d0ffd8]",
        },
        {
            label: "Pencapaian & Sertifikat",
            value: stats?.totalCertifications ?? 0,
            sublabel: "Level N5-N2",
            growth: "Terverifikasi",
            icon: Award,
            color: "text-[#944654]",
            badgeBg: "bg-[#ffd9dd] text-[#79313f]",
            iconBg: "bg-[#ffd9dd]",
        },
        {
            label: "Catatan Pembelajaran",
            value: stats?.totalNotes ?? 0,
            sublabel: "Jurnal & Catatan Siswa",
            growth: "Berkembang",
            icon: Book,
            color: "text-[#59413f]",
            badgeBg: "bg-[#f5ece7] text-[#1e1b18]",
            iconBg: "bg-[#f5ece7]",
        },
    ];

    const quickLinks = [
        {
            label: "Tambah Kana",
            icon: PenTool,
            href: "/admin/kana",
            color: "bg-[#c73e3a] hover:bg-[#a52525] text-white",
        },
        {
            label: "Tambah Kanji",
            icon: Languages,
            href: "/admin/kanji",
            color: "bg-[#944654] hover:bg-[#79313f] text-white",
        },
        {
            label: "Tambah Kosakata",
            icon: List,
            href: "/admin/vocabulary",
            color: "bg-[#326040] hover:bg-[#225031] text-white",
        },
        {
            label: "Tambah Grammar",
            icon: BookOpen,
            href: "/admin/grammar",
            color: "bg-[#0082b2] hover:bg-[#006b94] text-white",
        },
        {
            label: "Bank Soal",
            icon: FileQuestion,
            href: "/admin/question",
            color: "bg-[#59413f] hover:bg-[#34302c] text-white",
        },
        {
            label: "CMS Landing",
            icon: LayoutTemplate,
            href: "/admin/landing",
            color: "bg-[#f5ece7] hover:bg-[#efe6e2] text-[#1e1b18] border border-[#efe6e2]",
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-6 pb-12"
        >
            {/* ── Sensei Hub Header Banner ── */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#efe6e2] shadow-[0_1px_8px_rgba(0,0,0,0.04)] relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="absolute -right-6 -bottom-8 font-jp text-[120px] sm:text-[160px] opacity-[0.03] select-none pointer-events-none font-bold text-[#1e1b18]">
                    管理
                </div>

                <div className="relative z-10 space-y-1.5">
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#fff0ef] text-[#c73e3a] border border-[#ffd9dd]">
                            <ShieldCheck size={13} /> Sensei Backoffice
                        </span>
                        <span className="text-xs text-[#79716b]">Akademi Musim Semi</span>
                    </div>
                    <h1 className="font-outfit text-2xl sm:text-3xl font-bold text-[#1e1b18]">
                        Pusat Kendali Kurikulum & Siswa
                    </h1>
                    <p className="text-sm text-[#59413f] max-w-xl">
                        Pantau progres siswa secara real-time, kelola modul kanji, tata bahasa, dan susun bank soal ujian.
                    </p>
                </div>

                <div className="relative z-10 flex items-center gap-2.5 flex-wrap">
                    <Link
                        href="/admin/question"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#c73e3a] hover:bg-[#a52525] text-white font-semibold text-sm shadow-[0_2px_8px_rgba(199,62,58,0.25)] transition-all"
                    >
                        <Plus size={16} />
                        <span>Buat Quiz Baru</span>
                    </Link>
                    <Link
                        href="/admin/activity"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#f5ece7] hover:bg-[#efe6e2] text-[#1e1b18] font-semibold text-sm border border-[#efe6e2] transition-colors"
                    >
                        <Activity size={16} />
                        <span>Log Aktivitas</span>
                    </Link>
                </div>
            </div>

            {/* ── 4 Stat Metric Cards ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((card, i) => {
                    const Icon = card.icon;
                    return (
                        <motion.div
                            key={card.label}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                            className="bg-white rounded-2xl p-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)] border border-[#efe6e2] flex flex-col justify-between relative overflow-hidden"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-[#79716b] truncate">
                                    {card.label}
                                </span>
                                <div className={`w-8 h-8 rounded-xl ${card.iconBg} flex items-center justify-center ${card.color} shrink-0`}>
                                    <Icon size={18} />
                                </div>
                            </div>

                            <div className="mt-3 flex items-baseline gap-2">
                                <span className="font-outfit text-2xl sm:text-3xl font-bold text-[#1e1b18]">
                                    {card.value}
                                </span>
                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${card.badgeBg}`}>
                                    {card.growth}
                                </span>
                            </div>

                            <p className="text-[11px] text-[#79716b] mt-1 pt-2 border-t border-[#f5ece7]">
                                {card.sublabel}
                            </p>
                        </motion.div>
                    );
                })}
            </div>

            {/* ── Quick Actions Bar ── */}
            <div className="bg-white rounded-2xl p-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)] border border-[#efe6e2]">
                <p className="text-xs font-bold uppercase tracking-wider text-[#79716b] mb-3">
                    Aksi Cepat Kelola Konten
                </p>
                <div className="flex flex-wrap gap-2.5">
                    {quickLinks.map((q) => {
                        const Icon = q.icon;
                        return (
                            <Link
                                key={q.label}
                                href={q.href}
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-2xs hover:opacity-95 ${q.color}`}
                            >
                                <Plus size={14} />
                                <span>{q.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* ── Student Directory Table ── */}
            <div className="bg-white rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border border-[#efe6e2] overflow-hidden">
                {/* Toolbar */}
                <div className="px-6 py-4 border-b border-[#efe6e2] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[#fbf2ed]/40">
                    <div>
                        <h2 className="font-outfit font-bold text-base text-[#1e1b18]">
                            Direktori & Progres Siswa
                        </h2>
                        <p className="text-xs text-[#79716b]">
                            {filteredUsers.length} siswa terdaftar di database
                        </p>
                    </div>
                    <div className="relative w-full sm:w-72">
                        <Search
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#79716b]"
                            size={15}
                        />
                        <input
                            type="text"
                            placeholder="Cari nama atau email..."
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white rounded-xl text-xs sm:text-sm border border-[#efe6e2] text-[#1e1b18] placeholder:text-[#79716b]/60 focus:ring-2 focus:ring-[#c73e3a]/20 focus:border-[#c73e3a] focus:outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#f5ece7] text-[#59413f] text-[11px] font-bold uppercase tracking-wider border-b border-[#efe6e2]">
                                <th className="py-3 px-6">Pelajar</th>
                                <th className="py-3 px-6">Peran / Role</th>
                                <th className="py-3 px-6 text-center">Kuis Selesai</th>
                                <th className="py-3 px-6 text-center">Pencapaian</th>
                                <th className="py-3 px-6 text-center">Catatan</th>
                                <th className="py-3 px-6 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#efe6e2]/60 text-sm">
                            {paginatedUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-16 text-center">
                                        <p className="font-jp text-4xl text-[#efe6e2] mb-2 font-bold">
                                            探す
                                        </p>
                                        <p className="text-[#79716b] text-sm">
                                            Tidak ada data siswa yang cocok dengan pencarian.
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                paginatedUsers.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-[#fbf2ed]/50 transition-colors"
                                    >
                                        <td className="py-3.5 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-[#c73e3a] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                                                    {getInitials(user.name)}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-[#1e1b18] leading-tight">
                                                        {user.name}
                                                    </div>
                                                    <div className="text-xs text-[#79716b]">
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-6">
                                            <span
                                                className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase ${
                                                    user.role === "admin"
                                                        ? "bg-[#fff0ef] text-[#c73e3a] border border-[#ffd9dd]"
                                                        : "bg-[#f5ece7] text-[#59413f]"
                                                }`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-6 text-center">
                                            <span className="font-bold text-[#1e1b18] font-outfit">
                                                {user.quizzes.length}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-6 text-center">
                                            <span className="font-bold text-[#326040] font-outfit">
                                                {user.certifications.filter((c) => c.passed).length}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-6 text-center">
                                            <span className="font-bold text-[#0082b2] font-outfit">
                                                {user.notes.length}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-6 text-center">
                                            <button
                                                onClick={() => {
                                                    setSelectedUser(user);
                                                    setActiveModalTab("quizzes");
                                                }}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f5ece7] hover:bg-[#fff0ef] hover:text-[#c73e3a] text-[#59413f] text-xs font-bold transition-all cursor-pointer border border-[#efe6e2]"
                                            >
                                                <Eye size={13} /> Tinjau
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="px-6 py-4 border-t border-[#efe6e2] flex items-center justify-between text-xs text-[#79716b] bg-[#fbf2ed]/30">
                        <span>
                            {(currentPage - 1) * ROWS_PER_PAGE + 1}–
                            {Math.min(currentPage * ROWS_PER_PAGE, filteredUsers.length)} dari {filteredUsers.length} Siswa
                        </span>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#efe6e2] text-[#59413f] hover:bg-[#f5ece7] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft size={15} />
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .filter((p) => Math.abs(p - currentPage) <= 2 || p === 1 || p === totalPages)
                                .map((p, idx, arr) => (
                                    <React.Fragment key={p}>
                                        {idx > 0 && arr[idx - 1] !== p - 1 && (
                                            <span className="text-[#79716b] px-1">…</span>
                                        )}
                                        <button
                                            onClick={() => setCurrentPage(p)}
                                            className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                                                p === currentPage
                                                    ? "bg-[#c73e3a] text-white shadow-xs"
                                                    : "border border-[#efe6e2] text-[#59413f] hover:bg-[#f5ece7]"
                                            }`}
                                        >
                                            {p}
                                        </button>
                                    </React.Fragment>
                                ))}
                            <button
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#efe6e2] text-[#59413f] hover:bg-[#f5ece7] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight size={15} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* ── Modal: User Progress Drawer ── */}
            <AnimatePresence>
                {selectedUser && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 16 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 16 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-[#efe6e2]"
                        >
                            {/* Modal Header */}
                            <div className="p-5 border-b border-[#efe6e2] flex items-center gap-4 bg-[#fbf2ed]/50">
                                <div className="w-12 h-12 rounded-xl bg-[#c73e3a] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                                    {getInitials(selectedUser.name)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-outfit font-bold text-[#1e1b18] text-lg leading-tight">
                                        {selectedUser.name}
                                    </h3>
                                    <p className="text-xs text-[#79716b]">
                                        {selectedUser.email}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelectedUser(null)}
                                    className="w-8 h-8 rounded-xl bg-white border border-[#efe6e2] hover:bg-[#f5ece7] flex items-center justify-center text-[#59413f] transition-colors shrink-0 cursor-pointer"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            {/* Tabs */}
                            <div className="flex border-b border-[#efe6e2] px-5 gap-1 bg-[#fbf2ed]/20">
                                {(
                                    [
                                        "quizzes",
                                        "certifications",
                                        "notes",
                                    ] as const
                                ).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveModalTab(tab)}
                                        className={`py-3 px-4 text-xs font-bold border-b-2 transition-all -mb-px cursor-pointer ${
                                            activeModalTab === tab
                                                ? "border-[#c73e3a] text-[#c73e3a]"
                                                : "border-transparent text-[#79716b] hover:text-[#1e1b18]"
                                        }`}
                                    >
                                        {tab === "quizzes" &&
                                            `Kuis (${selectedUser.quizzes.length})`}
                                        {tab === "certifications" &&
                                            `Pencapaian (${selectedUser.certifications.length})`}
                                        {tab === "notes" &&
                                            `Catatan (${selectedUser.notes.length})`}
                                    </button>
                                ))}
                            </div>

                            {/* Content */}
                            <div className="p-5 overflow-y-auto flex-1 space-y-3 custom-scrollbar">
                                {activeModalTab === "quizzes" &&
                                    (selectedUser.quizzes.length === 0 ? (
                                        <p className="text-center text-[#79716b] py-8 text-sm">
                                            Belum ada riwayat kuis untuk siswa ini.
                                        </p>
                                    ) : (
                                        selectedUser.quizzes.map((quiz) => (
                                            <div
                                                key={quiz.id}
                                                className="p-4 rounded-xl border border-[#efe6e2] bg-[#fbf2ed]/40 flex justify-between items-center"
                                            >
                                                <div>
                                                    <span className="text-xs font-bold uppercase tracking-wider text-[#c73e3a] block mb-1">
                                                        {quiz.category}
                                                    </span>
                                                    <span className="text-xs text-[#79716b]">
                                                        {new Date(
                                                            quiz.created_at,
                                                        ).toLocaleDateString(
                                                            "id-ID",
                                                            { dateStyle: "medium" },
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="font-outfit font-bold text-xl text-[#1e1b18]">
                                                        {quiz.score}
                                                    </span>
                                                    <span className="text-[#79716b] text-xs">
                                                        {" "}
                                                        / {quiz.total}
                                                    </span>
                                                    <div className="w-20 h-1.5 rounded-full bg-[#efe6e2] mt-1 overflow-hidden">
                                                        <div
                                                            className="h-full rounded-full bg-[#4b7957]"
                                                            style={{
                                                                width: `${Math.round((quiz.score / quiz.total) * 100)}%`,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ))}
                                {activeModalTab === "certifications" &&
                                    (selectedUser.certifications.length === 0 ? (
                                        <p className="text-center text-[#79716b] py-8 text-sm">
                                            Belum ada sertifikat/pencapaian.
                                        </p>
                                    ) : (
                                        selectedUser.certifications.map((cert) => (
                                            <div
                                                key={cert.id}
                                                className="p-4 rounded-xl border border-[#efe6e2] bg-[#fbf2ed]/40 flex justify-between items-center"
                                            >
                                                <div>
                                                    <span className="font-bold text-[#1e1b18] block">
                                                        Level {cert.category.toUpperCase()} — Tahap {cert.level}
                                                    </span>
                                                    <span
                                                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-block mt-1 ${
                                                            cert.passed
                                                                ? "bg-[#d0ffd8] text-[#00210d]"
                                                                : "bg-[#fff0ef] text-[#c73e3a]"
                                                        }`}
                                                    >
                                                        {cert.passed ? "✓ Lulus" : "✗ Belum Lulus"}
                                                    </span>
                                                </div>
                                                <span className="font-outfit font-bold text-2xl text-[#1e1b18]">
                                                    {cert.score}
                                                    <span className="text-xs text-[#79716b]"> pts</span>
                                                </span>
                                            </div>
                                        ))
                                    ))}
                                {activeModalTab === "notes" &&
                                    (selectedUser.notes.length === 0 ? (
                                        <p className="text-center text-[#79716b] py-8 text-sm">
                                            Belum ada catatan pribadi.
                                        </p>
                                    ) : (
                                        selectedUser.notes.map((note) => (
                                            <div
                                                key={note.id}
                                                className="p-4 rounded-xl border border-[#efe6e2] bg-[#fbf2ed]/40 space-y-2"
                                            >
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#c73e3a] bg-[#fff0ef] px-2.5 py-1 rounded-full inline-block border border-[#ffd9dd]">
                                                    {note.date}
                                                </span>
                                                <p className="text-sm text-[#1e1b18] whitespace-pre-wrap leading-relaxed">
                                                    {note.content}
                                                </p>
                                            </div>
                                        ))
                                    ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

Dashboard.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;

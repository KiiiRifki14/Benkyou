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
        if (!name) return "?";
        const parts = name.trim().split(" ");
        if (parts.length === 1) return parts[0][0].toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    const getAvatarColor = (name: string) => {
        const colors = [
            "linear-gradient(135deg, #667eea, #764ba2)",
            "linear-gradient(135deg, #f093fb, #f5576c)",
            "linear-gradient(135deg, #4facfe, #00f2fe)",
            "linear-gradient(135deg, #43e97b, #38f9d7)",
            "linear-gradient(135deg, #fa709a, #fee140)",
            "linear-gradient(135deg, #a18cd1, #fbc2eb)",
        ];
        const idx = name.charCodeAt(0) % colors.length;
        return colors[idx];
    };

    const statCards = [
        {
            label: "Total Pelajar",
            value: stats?.totalUsers ?? 0,
            icon: Users,
            color: "#3b82f6",
            bg: "linear-gradient(135deg, #3b82f6, #6366f1)",
            lightBg: "#eff6ff",
        },
        {
            label: "Kuis Dikerjakan",
            value: stats?.totalQuizzes ?? 0,
            icon: CheckCircle,
            color: "#10b981",
            bg: "linear-gradient(135deg, #10b981, #059669)",
            lightBg: "#f0fdf4",
        },
        {
            label: "Pencapaian Diraih",
            value: stats?.totalCertifications ?? 0,
            icon: Award,
            color: "#8b5cf6",
            bg: "linear-gradient(135deg, #8b5cf6, #a855f7)",
            lightBg: "#faf5ff",
        },
        {
            label: "Catatan Ditulis",
            value: stats?.totalNotes ?? 0,
            icon: Book,
            color: "#f59e0b",
            bg: "linear-gradient(135deg, #f59e0b, #ef4444)",
            lightBg: "#fffbeb",
        },
    ];

    const quickLinks = [
        {
            label: "Tambah Kana",
            icon: PenTool,
            href: "/admin/kana",
            color: "#bc002d",
        },
        {
            label: "Tambah Kanji",
            icon: Languages,
            href: "/admin/kanji",
            color: "#7c3aed",
        },
        {
            label: "Tambah Kosakata",
            icon: List,
            href: "/admin/vocabulary",
            color: "#0891b2",
        },
        {
            label: "Tambah Grammar",
            icon: BookOpen,
            href: "/admin/grammar",
            color: "#059669",
        },
        {
            label: "Tambah Soal",
            icon: FileQuestion,
            href: "/admin/question",
            color: "#d97706",
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 pb-12"
        >
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="font-serif text-2xl font-bold text-slate-800">
                        Pusat Administrator
                    </h1>
                    <p className="text-slate-500 text-sm mt-0.5">
                        Kelola materi & pantau progres belajar.
                    </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border text-[#bc002d] border-red-200 bg-red-50 shrink-0">
                    <GraduationCap size={11} /> Administrator Sensei
                </span>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((card, i) => {
                    const Icon = card.icon;
                    return (
                        <motion.div
                            key={card.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.07 }}
                            className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-start gap-4 overflow-hidden relative"
                        >
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-white"
                                style={{
                                    background: card.bg,
                                    boxShadow: `0 4px 14px ${card.color}40`,
                                }}
                            >
                                <Icon size={22} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs text-slate-500 mb-0.5 truncate">
                                    {card.label}
                                </p>
                                <p className="text-3xl font-serif font-bold text-slate-800 leading-none">
                                    {card.value}
                                </p>
                            </div>
                            <TrendingUp
                                size={60}
                                className="absolute -right-3 -bottom-3 opacity-[0.04] text-slate-900"
                            />
                        </motion.div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                    Aksi Cepat
                </p>
                <div className="flex flex-wrap gap-2">
                    {quickLinks.map((q) => {
                        const Icon = q.icon;
                        return (
                            <Link
                                key={q.label}
                                href={q.href}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
                                style={{ background: q.color }}
                            >
                                <Plus size={14} />
                                {q.label}
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                {/* Toolbar */}
                <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                        <h2 className="font-bold text-slate-800">
                            Daftar Siswa
                        </h2>
                        <p className="text-xs text-slate-400">
                            {filteredUsers.length} pengguna ditemukan
                        </p>
                    </div>
                    <div className="relative w-full sm:w-72">
                        <Search
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                            size={15}
                        />
                        <input
                            type="text"
                            placeholder="Cari nama atau email..."
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl text-sm border border-slate-200 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 focus:bg-white focus:outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
                                <th className="py-3 px-6">Pelajar</th>
                                <th className="py-3 px-6">Hak Akses</th>
                                <th className="py-3 px-6 text-center">
                                    Kuis Selesai
                                </th>
                                <th className="py-3 px-6 text-center">
                                    Pencapaian
                                </th>
                                <th className="py-3 px-6 text-center">
                                    Catatan
                                </th>
                                <th className="py-3 px-6 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-sm">
                            {paginatedUsers.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="py-16 text-center"
                                    >
                                        <p className="font-jp text-4xl text-slate-200 mb-2">
                                            探す
                                        </p>
                                        <p className="text-slate-400 text-sm">
                                            Tidak ada data yang ditemukan.
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                paginatedUsers.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-slate-50/70 transition-colors"
                                    >
                                        <td className="py-3.5 px-6">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs shrink-0"
                                                    style={{
                                                        background:
                                                            getAvatarColor(
                                                                user.name,
                                                            ),
                                                    }}
                                                >
                                                    {getInitials(user.name)}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-slate-800 leading-tight">
                                                        {user.name}
                                                    </div>
                                                    <div className="text-xs text-slate-400">
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-6">
                                            <span
                                                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider uppercase ${
                                                    user.role === "admin"
                                                        ? "bg-red-50 text-red-600 border border-red-100"
                                                        : "bg-slate-100 text-slate-500"
                                                }`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-6 text-center">
                                            <span className="font-bold text-slate-700">
                                                {user.quizzes.length}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-6 text-center">
                                            <span className="font-bold text-emerald-600">
                                                {
                                                    user.certifications.filter(
                                                        (c) => c.passed,
                                                    ).length
                                                }
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-6 text-center">
                                            <span className="font-bold text-blue-600">
                                                {user.notes.length}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-6 text-center">
                                            <button
                                                onClick={() => {
                                                    setSelectedUser(user);
                                                    setActiveModalTab(
                                                        "quizzes",
                                                    );
                                                }}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 text-xs font-bold transition-all"
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
                    <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-sm">
                        <span className="text-slate-400 text-xs">
                            {(currentPage - 1) * ROWS_PER_PAGE + 1}–
                            {Math.min(
                                currentPage * ROWS_PER_PAGE,
                                filteredUsers.length,
                            )}{" "}
                            dari {filteredUsers.length}
                        </span>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() =>
                                    setCurrentPage((p) => Math.max(1, p - 1))
                                }
                                disabled={currentPage === 1}
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft size={15} />
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .filter(
                                    (p) =>
                                        Math.abs(p - currentPage) <= 2 ||
                                        p === 1 ||
                                        p === totalPages,
                                )
                                .map((p, idx, arr) => (
                                    <React.Fragment key={p}>
                                        {idx > 0 && arr[idx - 1] !== p - 1 && (
                                            <span className="text-slate-300 px-1">
                                                …
                                            </span>
                                        )}
                                        <button
                                            onClick={() => setCurrentPage(p)}
                                            className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                                                p === currentPage
                                                    ? "bg-[#bc002d] text-white shadow-sm"
                                                    : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                                            }`}
                                        >
                                            {p}
                                        </button>
                                    </React.Fragment>
                                ))}
                            <button
                                onClick={() =>
                                    setCurrentPage((p) =>
                                        Math.min(totalPages, p + 1),
                                    )
                                }
                                disabled={currentPage === totalPages}
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight size={15} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal: User Progress */}
            <AnimatePresence>
                {selectedUser && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 16 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 16 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                            }}
                            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden"
                        >
                            {/* Modal Header */}
                            <div className="p-5 border-b border-slate-100 flex items-center gap-4">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shrink-0"
                                    style={{
                                        background: getAvatarColor(
                                            selectedUser.name,
                                        ),
                                    }}
                                >
                                    {getInitials(selectedUser.name)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-slate-800 text-lg leading-tight">
                                        {selectedUser.name}
                                    </h3>
                                    <p className="text-xs text-slate-400">
                                        {selectedUser.email}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelectedUser(null)}
                                    className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors shrink-0"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            {/* Tabs */}
                            <div className="flex border-b border-slate-100 px-5 gap-1 bg-slate-50">
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
                                        className={`py-3 px-4 text-xs font-bold border-b-2 transition-all -mb-px ${
                                            activeModalTab === tab
                                                ? "border-[#bc002d] text-[#bc002d]"
                                                : "border-transparent text-slate-400 hover:text-slate-600"
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
                            <div className="p-5 overflow-y-auto flex-1 space-y-3">
                                {activeModalTab === "quizzes" &&
                                    (selectedUser.quizzes.length === 0 ? (
                                        <p className="text-center text-slate-400 py-8 text-sm">
                                            Belum ada riwayat kuis.
                                        </p>
                                    ) : (
                                        selectedUser.quizzes.map((quiz) => (
                                            <div
                                                key={quiz.id}
                                                className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex justify-between items-center"
                                            >
                                                <div>
                                                    <span className="text-xs font-bold uppercase tracking-wider text-[#bc002d] block mb-1">
                                                        {quiz.category}
                                                    </span>
                                                    <span className="text-xs text-slate-400">
                                                        {new Date(
                                                            quiz.created_at,
                                                        ).toLocaleDateString(
                                                            "id-ID",
                                                            {
                                                                dateStyle:
                                                                    "medium",
                                                            },
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="font-bold text-xl text-slate-800">
                                                        {quiz.score}
                                                    </span>
                                                    <span className="text-slate-400 text-xs">
                                                        {" "}
                                                        / {quiz.total}
                                                    </span>
                                                    <div className="w-20 h-1.5 rounded-full bg-slate-200 mt-1 overflow-hidden">
                                                        <div
                                                            className="h-full rounded-full bg-emerald-500"
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
                                    (selectedUser.certifications.length ===
                                    0 ? (
                                        <p className="text-center text-slate-400 py-8 text-sm">
                                            Belum ada pencapaian.
                                        </p>
                                    ) : (
                                        selectedUser.certifications.map(
                                            (cert) => (
                                                <div
                                                    key={cert.id}
                                                    className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex justify-between items-center"
                                                >
                                                    <div>
                                                        <span className="font-bold text-slate-800 block">
                                                            Level{" "}
                                                            {cert.category.toUpperCase()}{" "}
                                                            — Tahap {cert.level}
                                                        </span>
                                                        <span
                                                            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-block mt-1 ${cert.passed ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}
                                                        >
                                                            {cert.passed
                                                                ? "✓ Lulus"
                                                                : "✗ Gagal"}
                                                        </span>
                                                    </div>
                                                    <span className="font-bold text-2xl text-slate-800">
                                                        {cert.score}
                                                        <span className="text-sm text-slate-400">
                                                            {" "}
                                                            pts
                                                        </span>
                                                    </span>
                                                </div>
                                            ),
                                        )
                                    ))}
                                {activeModalTab === "notes" &&
                                    (selectedUser.notes.length === 0 ? (
                                        <p className="text-center text-slate-400 py-8 text-sm">
                                            Belum ada catatan pribadi.
                                        </p>
                                    ) : (
                                        selectedUser.notes.map((note) => (
                                            <div
                                                key={note.id}
                                                className="p-4 rounded-xl border border-slate-100 bg-slate-50 space-y-2"
                                            >
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#bc002d] bg-red-50 px-2.5 py-1 rounded-full inline-block">
                                                    {note.date}
                                                </span>
                                                <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
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

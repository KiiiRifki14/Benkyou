import React from "react";
import { Head } from "@inertiajs/react";
import Layout from "@/Components/Layout";
import {
    Activity,
    Calendar,
    Clock,
    Target,
    BookOpen,
    Award,
    LogIn,
    TrendingUp,
    Zap,
} from "lucide-react";

interface ActivityItem {
    id: number;
    action: string;
    category: string;
    description: string;
    meta: Record<string, any> | null;
    time: string;
    date: string;
}

interface Stats {
    totalActions: number;
    todayActions: number;
    quizCompleted: number;
    missionsDone: number;
    loginCount: number;
    daysActive: number;
    firstActivity: string | null;
    lastActivity: string | null;
}

const categoryIcons: Record<string, React.ReactNode> = {
    quiz: <Zap size={14} className="text-purple-500" />,
    mission: <Target size={14} className="text-orange-500" />,
    notes: <BookOpen size={14} className="text-pink-500" />,
    learning: <BookOpen size={14} className="text-blue-500" />,
    general: <LogIn size={14} className="text-green-500" />,
};

const categoryColors: Record<string, string> = {
    quiz: "bg-purple-50 border-purple-200 text-purple-700",
    mission: "bg-orange-50 border-orange-200 text-orange-700",
    notes: "bg-pink-50 border-pink-200 text-pink-700",
    learning: "bg-blue-50 border-blue-200 text-blue-700",
    general: "bg-green-50 border-green-200 text-green-700",
};

export default function AdminActivity({
    activities = [],
    stats = {} as Stats,
    studentName = "",
}: {
    activities?: ActivityItem[];
    stats?: Stats;
    studentName?: string | null;
}) {
    return (
        <Layout>
            <Head title="Aktivitas Siswa" />

            <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-6">
                <div>
                    <h1 className="text-2xl font-serif font-bold text-slate-800 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500">
                            <Activity size={20} />
                        </div>
                        Aktivitas {studentName || "Siswa"}
                    </h1>
                    <p className="text-slate-500 mt-2 font-medium">
                        Pantau apa saja yang dia lakukan di web ini~ 💕
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {[
                        {
                            label: "Hari Aktif",
                            value: stats.daysActive ?? 0,
                            icon: Calendar,
                            color: "text-blue-600 bg-blue-50",
                        },
                        {
                            label: "Total Aksi",
                            value: stats.totalActions ?? 0,
                            icon: TrendingUp,
                            color: "text-indigo-600 bg-indigo-50",
                        },
                        {
                            label: "Hari Ini",
                            value: stats.todayActions ?? 0,
                            icon: Clock,
                            color: "text-green-600 bg-green-50",
                        },
                        {
                            label: "Kuis Selesai",
                            value: stats.quizCompleted ?? 0,
                            icon: Zap,
                            color: "text-purple-600 bg-purple-50",
                        },
                        {
                            label: "Misi Selesai",
                            value: stats.missionsDone ?? 0,
                            icon: Target,
                            color: "text-orange-600 bg-orange-50",
                        },
                        {
                            label: "Login",
                            value: stats.loginCount ?? 0,
                            icon: LogIn,
                            color: "text-emerald-600 bg-emerald-50",
                        },
                    ].map((s, i) => (
                        <div
                            key={i}
                            className="bg-white border border-slate-200 rounded-xl p-4 text-center"
                        >
                            <div
                                className={`w-8 h-8 rounded-lg ${s.color} flex items-center justify-center mx-auto mb-2`}
                            >
                                <s.icon size={16} />
                            </div>
                            <p className="text-2xl font-bold text-slate-800">
                                {s.value}
                            </p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                {s.label}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Date Range Info */}
                {stats.firstActivity && (
                    <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-2 text-slate-600">
                            <Calendar size={14} className="text-slate-400" />
                            <span>
                                Aktif sejak{" "}
                                <strong>{stats.firstActivity}</strong>
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                            <Clock size={14} className="text-slate-400" />
                            <span>
                                Terakhir: <strong>{stats.lastActivity}</strong>
                            </span>
                        </div>
                    </div>
                )}

                {/* Activity Timeline */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                        <h2 className="font-bold text-slate-700 text-sm flex items-center gap-2">
                            <Activity size={14} /> Timeline Aktivitas
                        </h2>
                    </div>

                    {activities.length === 0 ? (
                        <div className="p-12 text-center text-slate-400 text-sm">
                            Belum ada aktivitas tercatat. Dia belum mulai
                            menggunakan web ini~
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
                            {activities.map((act) => (
                                <div
                                    key={act.id}
                                    className="px-5 py-3 flex items-start gap-3 hover:bg-slate-50/50 transition-colors"
                                >
                                    <div
                                        className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${categoryColors[act.category] || "bg-gray-50 border-gray-200"}`}
                                    >
                                        {categoryIcons[act.category] || (
                                            <Activity size={12} />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-slate-700">
                                            {act.description}
                                        </p>
                                        <p className="text-[10px] text-slate-400 mt-0.5">
                                            {act.date} • {act.time}
                                        </p>
                                    </div>
                                    {act.meta?.score !== undefined && (
                                        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full shrink-0">
                                            {act.meta.score}/
                                            {act.meta.total ?? 100}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

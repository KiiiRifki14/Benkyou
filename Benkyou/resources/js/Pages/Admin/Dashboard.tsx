import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, CheckCircle, Book, Award, Eye, ShieldAlert, Search 
} from 'lucide-react';
import Layout from '@/Components/Layout';
import { usePage } from '@inertiajs/react';

interface UserProgress {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
  quizzes: { id: number; score: number; total: number; category: string; created_at: string }[];
  notes: { id: number; date: string; content: string }[];
  certifications: { id: number; category: string; level: number; passed: boolean; score: number }[];
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

export default function Dashboard({ usersData = [], stats }: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserProgress | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<'quizzes' | 'notes' | 'certifications'>('quizzes');

  const filteredUsers = usersData.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-10 pb-12"
    >
      {/* Header */}
      <header className="border-b border-[#E5E5E5] pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <ShieldAlert className="text-[var(--color-japan-red)] animate-pulse" size={36} />
            <h1 className="font-serif text-4xl font-bold text-[var(--color-ink)]">Pusat Administrator</h1>
          </div>
          <p className="text-[var(--color-ink-light)]">Kelola data pembelajaran secara real-time dan awasi progres pengguna Benkyou.</p>
        </div>
        <div className="bg-[var(--color-japan-red)]/10 text-[var(--color-japan-red)] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border border-[var(--color-japan-red)]/20 shadow-sm shrink-0">
          Administrator Sensei
        </div>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-[#E5E5E5] flex items-center gap-6">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
            <Users size={28} />
          </div>
          <div>
            <p className="text-xs text-[var(--color-ink-light)] mb-1">Total Pelajar</p>
            <p className="text-3xl font-serif font-bold">{stats.totalUsers}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-[#E5E5E5] flex items-center gap-6">
          <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center shrink-0">
            <CheckCircle size={28} />
          </div>
          <div>
            <p className="text-xs text-[var(--color-ink-light)] mb-1">Kuis Dikerjakan</p>
            <p className="text-3xl font-serif font-bold">{stats.totalQuizzes}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-[#E5E5E5] flex items-center gap-6">
          <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shrink-0">
            <Award size={28} />
          </div>
          <div>
            <p className="text-xs text-[var(--color-ink-light)] mb-1">Sertifikasi Lulus</p>
            <p className="text-3xl font-serif font-bold">{stats.totalCertifications}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-[#E5E5E5] flex items-center gap-6">
          <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
            <Book size={28} />
          </div>
          <div>
            <p className="text-xs text-[var(--color-ink-light)] mb-1">Catatan Ditulis</p>
            <p className="text-3xl font-serif font-bold">{stats.totalNotes}</p>
          </div>
        </div>
      </section>

      {/* Main Workspace */}
      <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-[#E5E5E5] overflow-hidden">
        {/* Search & Actions Bar */}
        <div className="p-6 border-b border-[#E5E5E5] flex justify-between items-center bg-gray-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder={`Cari siswa...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white rounded-full text-sm border border-[#E5E5E5] focus:ring-2 focus:ring-[var(--color-japan-red)] focus:border-transparent focus:outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        {/* TAB 1: USERS MONITORING */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--color-washi)] text-[var(--color-ink-light)] text-xs font-bold uppercase tracking-wider border-b border-[#E5E5E5]">
                <th className="py-4 px-6">Pelajar</th>
                <th className="py-4 px-6">Hak Akses</th>
                <th className="py-4 px-6 text-center">Kuis Selesai</th>
                <th className="py-4 px-6 text-center">Lulus Ujian</th>
                <th className="py-4 px-6 text-center">Total Catatan</th>
                <th className="py-4 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5] text-sm">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-[var(--color-ink)]">{user.name}</div>
                    <div className="text-xs text-[var(--color-ink-light)]">{user.email}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                      user.role === 'admin' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center font-serif font-bold text-lg">{user.quizzes.length}</td>
                  <td className="py-4 px-6 text-center font-serif font-bold text-lg text-green-600">
                    {user.certifications.filter(c => c.passed).length}
                  </td>
                  <td className="py-4 px-6 text-center font-serif font-bold text-lg text-blue-600">{user.notes.length}</td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="px-4 py-2 rounded-full bg-[var(--color-washi)] hover:bg-[var(--color-japan-red)] hover:text-white text-[var(--color-ink)] text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-sm"
                    >
                      <Eye size={14} /> Tinjau Progres
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL: USERS PROGRES REVIEW --- */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-[#E5E5E5]">
            <div className="p-6 border-b border-[#E5E5E5] flex justify-between items-center bg-[var(--color-washi)]">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[var(--color-ink)]">{selectedUser.name}</h3>
                <p className="text-xs text-[var(--color-ink-light)]">{selectedUser.email}</p>
              </div>
              <button onClick={() => setSelectedUser(null)} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-black shadow-sm font-bold">✕</button>
            </div>

            <div className="flex border-b border-[#E5E5E5] px-6 pt-2 gap-2 bg-gray-50">
              <button
                onClick={() => setActiveModalTab('quizzes')}
                className={`py-3 px-6 text-sm font-bold border-b-2 transition-all ${
                  activeModalTab === 'quizzes' ? 'border-[var(--color-japan-red)] text-[var(--color-japan-red)] bg-white rounded-t-xl shadow-sm' : 'border-transparent text-[var(--color-ink-light)] hover:text-black'
                }`}
              >
                Riwayat Kuis ({selectedUser.quizzes.length})
              </button>
              <button
                onClick={() => setActiveModalTab('certifications')}
                className={`py-3 px-6 text-sm font-bold border-b-2 transition-all ${
                  activeModalTab === 'certifications' ? 'border-[var(--color-japan-red)] text-[var(--color-japan-red)] bg-white rounded-t-xl shadow-sm' : 'border-transparent text-[var(--color-ink-light)] hover:text-black'
                }`}
              >
                Sertifikasi ({selectedUser.certifications.length})
              </button>
              <button
                onClick={() => setActiveModalTab('notes')}
                className={`py-3 px-6 text-sm font-bold border-b-2 transition-all ${
                  activeModalTab === 'notes' ? 'border-[var(--color-japan-red)] text-[var(--color-japan-red)] bg-white rounded-t-xl shadow-sm' : 'border-transparent text-[var(--color-ink-light)] hover:text-black'
                }`}
              >
                Catatan ({selectedUser.notes.length})
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-4 bg-white">
              {activeModalTab === 'quizzes' && (
                <div className="space-y-3">
                  {selectedUser.quizzes.map((quiz) => (
                    <div key={quiz.id} className="p-4 rounded-2xl border border-[#E5E5E5] flex justify-between items-center bg-gray-50/50">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-japan-red)] block mb-1">{quiz.category}</span>
                        <span className="text-xs text-gray-400">{new Date(quiz.created_at).toLocaleDateString('id-ID', { dateStyle: 'medium' })}</span>
                      </div>
                      <div className="font-serif font-bold text-2xl text-[var(--color-ink)]">
                        {quiz.score} <span className="text-sm text-gray-400">/ {quiz.total}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeModalTab === 'certifications' && (
                <div className="space-y-3">
                  {selectedUser.certifications.map((cert) => (
                    <div key={cert.id} className="p-4 rounded-2xl border border-[#E5E5E5] flex justify-between items-center bg-gray-50/50">
                      <div>
                        <span className="text-sm font-bold uppercase tracking-wider text-[var(--color-ink)] block">LEVEL {cert.category.toUpperCase()} - Tahap {cert.level}</span>
                        <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-block mt-1 ${cert.passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{cert.passed ? 'Lulus' : 'Gagal'}</span>
                      </div>
                      <div className="font-serif font-bold text-2xl text-[var(--color-ink)]">
                        {cert.score} <span className="text-sm text-gray-400">pts</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeModalTab === 'notes' && (
                <div className="space-y-4">
                  {selectedUser.notes.map((note) => (
                    <div key={note.id} className="p-5 rounded-2xl border border-[#E5E5E5] bg-[var(--color-washi)]/30 space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-japan-red)] bg-[#fff9f9] px-3 py-1 rounded-full inline-block">{note.date}</span>
                      <p className="text-sm text-[var(--color-ink)] whitespace-pre-wrap leading-relaxed">{note.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

Dashboard.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;

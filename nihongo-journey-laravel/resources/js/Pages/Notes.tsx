import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Book, Plus, Trash2 } from 'lucide-react';

interface Note {
  id: string;
  date: string;
  content: string;
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('nihongo_notes');
      if (saved) {
        setNotes(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to parse notes from local storage:', e);
    }
  }, []);

  const saveNote = () => {
    if (!newNote.trim()) return;
    
    const note: Note = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('id-ID', {
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      content: newNote
    };

    const updated = [note, ...notes];
    setNotes(updated);
    localStorage.setItem('nihongo_notes', JSON.stringify(updated));
    setNewNote('');
  };

  const deleteNote = (id: string) => {
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
    localStorage.setItem('nihongo_notes', JSON.stringify(updated));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-8 pb-12 px-2 sm:px-4"
    >
      <header className="text-center space-y-4 mb-10">
        <h1 className="font-serif text-3xl sm:text-4xl font-light text-[var(--color-ink)] flex items-center justify-center gap-3">
          <Book className="text-[var(--color-japan-red)]" size={32} />
          Catatan Pribadi
        </h1>
        <p className="text-[var(--color-ink-light)] text-sm sm:text-base">
          Tulis jurnal harianmu, hal baru yang dipelajari, atau sekadar catatan biasa.
        </p>
      </header>

      <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-[#E5E5E5] space-y-4">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Tulis catatan barumu di sini..."
          className="w-full h-32 sm:h-40 p-4 rounded-xl sm:rounded-2xl border border-gray-200 focus:outline-none focus:border-[var(--color-japan-red)] focus:ring-1 focus:ring-[var(--color-japan-red)] resize-none text-sm sm:text-base mb-2"
        />
        <div className="flex justify-end">
          <button
            onClick={saveNote}
            disabled={!newNote.trim()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--color-ink)] text-white font-medium hover:bg-black disabled:opacity-50 transition-colors"
          >
            <Plus size={18} />
            Simpan Catatan
          </button>
        </div>
      </div>

      <div className="space-y-4 mt-8">
        <h2 className="font-serif text-xl sm:text-2xl font-medium mb-6">Catatan Sebelumnya</h2>
        {notes.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-[#E5E5E5] text-[var(--color-ink-light)] tracking-wide">
            Belum ada catatan. Mulai tulis diary belajarmu hari ini!
          </div>
        ) : (
          <div className="grid gap-4">
            {notes.map((note) => (
              <div key={note.id} className="bg-white p-4 sm:p-6 rounded-2xl border border-[#E5E5E5] shadow-sm relative group">
                <div className="flex justify-between items-start mb-3 pr-8">
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--color-japan-red)] bg-[#fff9f9] px-3 py-1 rounded-full">
                    {note.date}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-[var(--color-ink)] whitespace-pre-wrap leading-relaxed">
                  {note.content}
                </p>
                
                <button 
                  onClick={() => deleteNote(note.id)}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-300 hover:text-red-500 transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100 p-2"
                  title="Hapus Catatan"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

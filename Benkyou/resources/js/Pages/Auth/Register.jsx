import React from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { UserPlus, ArrowRight } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Daftar Akun - Benkyou" />

            <div className="text-center mb-8 space-y-2">
                <h2 className="font-serif text-3xl font-bold text-[var(--color-ink)]">Mulai Perjalananmu</h2>
                <p className="text-sm text-[var(--color-ink-light)]">Buat akun gratis dan dapatkan akses penuh ke seluruh modul dan sertifikasi.</p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="name" value="Nama Lengkap" className="font-bold text-sm text-[var(--color-ink)] mb-2" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="w-full px-4 py-3 rounded-2xl border border-[#E5E5E5] bg-[#FCFBF9] text-[var(--color-ink)] focus:bg-white focus:ring-2 focus:ring-[var(--color-japan-red)] focus:border-[var(--color-japan-red)] transition-all shadow-sm outline-none"
                        autoComplete="name"
                        isFocused={true}
                        placeholder="Kenji Pratama"
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2 text-red-600 text-xs font-medium" />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Alamat Email" className="font-bold text-sm text-[var(--color-ink)] mb-2" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="w-full px-4 py-3 rounded-2xl border border-[#E5E5E5] bg-[#FCFBF9] text-[var(--color-ink)] focus:bg-white focus:ring-2 focus:ring-[var(--color-japan-red)] focus:border-[var(--color-japan-red)] transition-all shadow-sm outline-none"
                        autoComplete="username"
                        placeholder="contoh@email.com"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2 text-red-600 text-xs font-medium" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Kata Sandi" className="font-bold text-sm text-[var(--color-ink)] mb-2" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="w-full px-4 py-3 rounded-2xl border border-[#E5E5E5] bg-[#FCFBF9] text-[var(--color-ink)] focus:bg-white focus:ring-2 focus:ring-[var(--color-japan-red)] focus:border-[var(--color-japan-red)] transition-all shadow-sm outline-none"
                        autoComplete="new-password"
                        placeholder="•••••••• (Minimal 8 karakter)"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2 text-red-600 text-xs font-medium" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Konfirmasi Kata Sandi"
                        className="font-bold text-sm text-[var(--color-ink)] mb-2"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="w-full px-4 py-3 rounded-2xl border border-[#E5E5E5] bg-[#FCFBF9] text-[var(--color-ink)] focus:bg-white focus:ring-2 focus:ring-[var(--color-japan-red)] focus:border-[var(--color-japan-red)] transition-all shadow-sm outline-none"
                        autoComplete="new-password"
                        placeholder="•••••••• (Ulangi kata sandi)"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2 text-red-600 text-xs font-medium" />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full py-4 rounded-full bg-[var(--color-japan-red)] text-white font-bold text-base hover:opacity-90 transition-all shadow-lg hover:shadow-[var(--color-japan-red)]/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2 group mt-6"
                >
                    <UserPlus size={20} /> Buat Akun Gratis <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="text-center text-sm text-[var(--color-ink-light)] pt-4 border-t border-[#E5E5E5]">
                    Sudah memiliki akun?{' '}
                    <Link href={route('login')} className="font-bold text-[var(--color-japan-red)] hover:underline">
                        Masuk di Sini
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}

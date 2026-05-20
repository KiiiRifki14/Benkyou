import React from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { LogIn, ArrowRight } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Masuk - Benkyou" />

            <div className="text-center mb-8 space-y-2">
                <h2 className="font-serif text-3xl font-bold text-[var(--color-ink)]">Selamat Datang Kembali</h2>
                <p className="text-sm text-[var(--color-ink-light)]">Silakan masuk untuk melanjutkan petualangan bahasa Jepang Anda.</p>
            </div>

            {status && (
                <div className="mb-6 p-4 rounded-2xl bg-green-50 border border-green-200 text-sm font-medium text-green-700 text-center">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="email" value="Alamat Email" className="font-bold text-sm text-[var(--color-ink)] mb-2" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="w-full px-4 py-3 rounded-2xl border border-[#E5E5E5] bg-[#FCFBF9] text-[var(--color-ink)] focus:bg-white focus:ring-2 focus:ring-[var(--color-japan-red)] focus:border-[var(--color-japan-red)] transition-all shadow-sm outline-none"
                        autoComplete="username"
                        isFocused={true}
                        placeholder="contoh@email.com"
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2 text-red-600 text-xs font-medium" />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <InputLabel htmlFor="password" value="Kata Sandi" className="font-bold text-sm text-[var(--color-ink)]" />
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-xs font-bold text-[var(--color-japan-red)] hover:underline"
                            >
                                Lupa Kata Sandi?
                            </Link>
                        )}
                    </div>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="w-full px-4 py-3 rounded-2xl border border-[#E5E5E5] bg-[#FCFBF9] text-[var(--color-ink)] focus:bg-white focus:ring-2 focus:ring-[var(--color-japan-red)] focus:border-[var(--color-japan-red)] transition-all shadow-sm outline-none"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2 text-red-600 text-xs font-medium" />
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center cursor-pointer group">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded border-gray-300 text-[var(--color-japan-red)] focus:ring-[var(--color-japan-red)]"
                        />
                        <span className="ms-3 text-sm text-[var(--color-ink-light)] group-hover:text-[var(--color-ink)] transition-colors">
                            Ingat sesi saya
                        </span>
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full py-4 rounded-full bg-[var(--color-japan-red)] text-white font-bold text-base hover:opacity-90 transition-all shadow-lg hover:shadow-[var(--color-japan-red)]/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2 group"
                >
                    <LogIn size={20} /> Masuk ke Dasbor <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="text-center text-sm text-[var(--color-ink-light)] pt-4 border-t border-[#E5E5E5]">
                    Belum memiliki akun?{' '}
                    <Link href={route('register')} className="font-bold text-[var(--color-japan-red)] hover:underline">
                        Daftar Sekarang
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}

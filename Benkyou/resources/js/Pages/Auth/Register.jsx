import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { UserPlus, ArrowRight } from "lucide-react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Daftar Akun - Benkyou" />

            <div className="text-center mb-8 space-y-2">
                <h2 className="font-serif text-3xl font-bold text-[var(--color-ink)]">
                    Mulai Perjalananmu
                </h2>
                <p className="text-sm text-[var(--color-ink-light)]">
                    Buat akun untuk mulai petualangan bahasa Jepangmu~
                </p>
            </div>

            {/* Google OAuth Register */}
            <div className="mb-6">
                <a
                    href={route('auth.google')}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-full border border-[#E5E5E5] bg-white hover:bg-[#FDFBF7] text-[var(--color-ink)] font-bold text-sm shadow-sm hover:shadow transition-all hover:-translate-y-0.5"
                >
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                        <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                    </svg>
                    <span>Daftar dengan Google</span>
                </a>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-[#E5E5E5]" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase tracking-wider">
                        <span className="bg-white px-3 text-[var(--color-ink-light)] font-medium">atau dengan email</span>
                    </div>
                </div>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel
                        htmlFor="name"
                        value="Nama Lengkap"
                        className="font-bold text-sm text-[var(--color-ink)] mb-2"
                    />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="w-full px-4 py-3 rounded-2xl border border-[#E5E5E5] bg-[#FCFBF9] text-[var(--color-ink)] focus:bg-white focus:ring-2 focus:ring-[var(--color-japan-red)] focus:border-[var(--color-japan-red)] transition-all shadow-sm outline-none"
                        autoComplete="name"
                        isFocused={true}
                        placeholder="Kenji Pratama"
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />

                    <InputError
                        message={errors.name}
                        className="mt-2 text-red-600 text-xs font-medium"
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor="email"
                        value="Alamat Email"
                        className="font-bold text-sm text-[var(--color-ink)] mb-2"
                    />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="w-full px-4 py-3 rounded-2xl border border-[#E5E5E5] bg-[#FCFBF9] text-[var(--color-ink)] focus:bg-white focus:ring-2 focus:ring-[var(--color-japan-red)] focus:border-[var(--color-japan-red)] transition-all shadow-sm outline-none"
                        autoComplete="username"
                        placeholder="contoh@email.com"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError
                        message={errors.email}
                        className="mt-2 text-red-600 text-xs font-medium"
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password"
                        value="Kata Sandi"
                        className="font-bold text-sm text-[var(--color-ink)] mb-2"
                    />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="w-full px-4 py-3 rounded-2xl border border-[#E5E5E5] bg-[#FCFBF9] text-[var(--color-ink)] focus:bg-white focus:ring-2 focus:ring-[var(--color-japan-red)] focus:border-[var(--color-japan-red)] transition-all shadow-sm outline-none"
                        autoComplete="new-password"
                        placeholder="•••••••• (Minimal 8 karakter)"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />

                    <InputError
                        message={errors.password}
                        className="mt-2 text-red-600 text-xs font-medium"
                    />
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
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2 text-red-600 text-xs font-medium"
                    />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full py-4 rounded-full bg-[var(--color-japan-red)] text-white font-bold text-base hover:opacity-90 transition-all shadow-lg hover:shadow-[var(--color-japan-red)]/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2 group mt-6"
                >
                    <UserPlus size={20} /> Buat Akun Gratis{" "}
                    <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                    />
                </button>

                <div className="text-center text-sm text-[var(--color-ink-light)] pt-4 border-t border-[#E5E5E5]">
                    Sudah memiliki akun?{" "}
                    <Link
                        href={route("login")}
                        className="font-bold text-[var(--color-japan-red)] hover:underline"
                    >
                        Masuk di Sini
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}

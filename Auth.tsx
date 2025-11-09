import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Auth } from "../lib/api";
import { Mail, Lock, User } from "lucide-react";

// Zod schemas (runtime validation)
const loginSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "At least 8 characters"),
});

const signupSchema = z.object({
    name: z.string().min(2, "Your name looks short"),
    email: z.string().email("Enter a valid email"),
    password: z
        .string()
        .min(8, "At least 8 characters")
        .regex(/[A-Z]/, "Add an uppercase letter")
        .regex(/[0-9]/, "Add a number"),
});

// Unified form type (TS) — name is optional here
type AuthValues = {
    name?: string;
    email: string;
    password: string;
};

export default function AuthPage() {
    const [mode, setMode] = useState<"login" | "signup">("login");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<AuthValues>({
        resolver: zodResolver(mode === "login" ? loginSchema : signupSchema),
    });

    const onSubmit = async (values: AuthValues) => {
        try {
            if (mode === "login") {
                await Auth.login({ email: values.email, password: values.password });
                alert("Logged in! (stub)");
            } else {
                await Auth.signup({
                    name: values.name ?? "",
                    email: values.email,
                    password: values.password,
                });
                alert("Signed up! (stub)");
            }
            reset();
        } catch (e: any) {
            alert(e?.response?.data?.message ?? "Request failed");
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold">PunchCard</h1>
                        <p className="text-sm opacity-70">Digital punchcards for local rewards</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-6">
                        <button
                            className={`py-2 rounded-xl border border-white/10 ${
                                mode === "login" ? "bg-white/10" : "hover:bg-white/5"
                            }`}
                            onClick={() => setMode("login")}
                            type="button"
                        >
                            Log in
                        </button>
                        <button
                            className={`py-2 rounded-xl border border-white/10 ${
                                mode === "signup" ? "bg-white/10" : "hover:bg-white/5"
                            }`}
                            onClick={() => setMode("signup")}
                            type="button"
                        >
                            Sign up
                        </button>
                    </div>

                    <form className="grid gap-3" onSubmit={handleSubmit(onSubmit)}>
                        {mode === "signup" && (
                            <div>
                                <label className="text-sm mb-1 block">Name</label>
                                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3">
                                    <User size={16} />
                                    <input
                                        {...register("name")}
                                        className="h-10 bg-transparent outline-none w-full"
                                        placeholder="Ada Lovelace"
                                    />
                                </div>
                                {errors.name && (
                                    <p className="text-xs text-red-400 mt-1">{errors.name.message as string}</p>
                                )}
                            </div>
                        )}

                        <div>
                            <label className="text-sm mb-1 block">Email</label>
                            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3">
                                <Mail size={16} />
                                <input
                                    {...register("email")}
                                    className="h-10 bg-transparent outline-none w-full"
                                    placeholder="id@andrew.cmu.edu"
                                    type="email"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-xs text-red-400 mt-1">{errors.email.message as string}</p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm mb-1 block">Password</label>
                            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3">
                                <Lock size={16} />
                                <input
                                    {...register("password")}
                                    className="h-10 bg-transparent outline-none w-full"
                                    placeholder="••••••••"
                                    type="password"
                                />
                            </div>
                            {errors.password && (
                                <p className="text-xs text-red-400 mt-1">{errors.password.message as string}</p>
                            )}
                        </div>

                        <button
                            disabled={isSubmitting}
                            className="mt-2 h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60"
                            type="submit"
                        >
                            {isSubmitting ? "Submitting..." : mode === "login" ? "Log in" : "Create account"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
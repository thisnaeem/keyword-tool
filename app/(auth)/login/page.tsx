"use client";
import { motion } from "framer-motion";
import { FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { LoginInput, loginSchema } from "@/lib/validations/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: LoginInput) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,

        redirect: false,
      });
      if (result?.error) {
        setError(result.error);
      }
      router.push("/dashboard");
    } catch (error) {
      setError("Something went wrong");
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-8 shadow-xl border border-gray-200 dark:border-gray-700"
        >
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-4"
            >
              <div className="p-3 bg-[#97ef39]/10">
                <FiMail className="w-8 h-8 text-[#97ef39]" />
              </div>
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800"
              >
                <p className="text-red-600 dark:text-red-400 text-sm text-center">
                  {error}
                </p>
              </motion.div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  className="pl-10 w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-200
                    dark:border-gray-600 focus:ring-2 focus:ring-[#97ef39] focus:border-transparent
                    placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm"
                >
                  {errors.email.message}
                </motion.span>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  {...register("password")}
                  type="password"
                  id="password"
                  className="pl-10 w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-200
                    dark:border-gray-600 focus:ring-2 focus:ring-[#97ef39] focus:border-transparent
                    placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm"
                >
                  {errors.password.message}
                </motion.span>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-2.5 bg-[#97ef39] hover:bg-[#88d633] text-black
                transition-all duration-200 font-medium disabled:opacity-70 disabled:cursor-not-allowed
                shadow-lg shadow-[#97ef39]/20 hover:shadow-[#97ef39]/30"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </motion.button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Sign In */}
            <motion.button
              type="button"
              onClick={handleGoogleSignIn}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-2.5 bg-white dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600
                hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium
                flex items-center justify-center gap-2 shadow-lg shadow-black/5"
            >
              <FcGoogle className="text-xl" />
              Sign in with Google
            </motion.button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#97ef39] hover:text-[#88d633] font-medium"
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

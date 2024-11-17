"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { signIn, useSession } from "next-auth/react";

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Invalid Email");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) router.replace("/dashboard");
    } else {
      setError("");
    }
  };

  return (
    sessionStatus !== "authenticated" && (
      <section className="bg-[url('/images/SignInBanner.jpg')] bg-cover bg-center relative flex justify-center items-center flex-col gap-10 h-screen">
        <div className="absolute inset-0 bg-black bg-opacity-20 z-0"></div>

        <div className="relative z-10 w-full max-w-md bg-transparent/60 rounded-lg shadow-lg p-8 text-goldenYellow">
          <h2 className="text-2xl font-bold mb-6 text-center">Welcome back!</h2>
          <button
            onClick={() => signIn("google")}
            className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-goldenYellow transition duration-200 font-semibold mb-2"
          >
            <img
              src="/images/google-logo.png"
              alt="Google"
              className="w-5 h-5 mr-3"
            />
            Sign In with Google
          </button>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-bold mb-2">
                Email
              </label>
              <input
                ref={emailRef}
                id="email"
                type="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-goldenYellow focus:border-goldenYellow"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                ref={passwordRef}
                id="password"
                type="password"
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-goldenYellow focus:border-goldenYellow"
              />
            </div>
            <p className="text-tomatoRed mb-4 font-bold">{error && error}</p>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-oliveGreen text-white font-semibold rounded-lg hover:bg-goldenYellow transition duration-200"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            You dont have account?{" "}
            <a
              href="/register"
              className="text-oliveGreen font-bold hover:underline"
            >
              Register here
            </a>
          </p>
        </div>
      </section>
    )
  );
};

export default LoginPage;

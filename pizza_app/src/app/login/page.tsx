"use client";

import React, { useRef, useState } from "react";

const LoginPage = () => {
  const [error, setError] = useState("");

  const usernameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = () => {};

  return (
    <section className="bg-[url('/images/SignInBanner.jpg')] bg-cover bg-center relative flex justify-center items-center flex-col gap-10 h-screen">
      <div className="absolute inset-0 bg-black bg-opacity-20 z-0"></div>

      <div className="relative z-10 w-full max-w-md bg-transparent/60 rounded-lg shadow-lg p-8 text-goldenYellow">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Welcome back!</h2>

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
            <label htmlFor="password" className="block text-sm font-bold mb-2">
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
  );
};

export default LoginPage;

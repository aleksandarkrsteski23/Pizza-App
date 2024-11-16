"use client";

import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

const RegisterPage = () => {
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const usernameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !email || !password) {
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

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (res.status === 400) {
        setError("Username or Email already exists");
      }
      if (res.status === 201) {
        setError("");
        // Clear form fields after successful registration
        if (usernameRef.current) usernameRef.current.value = "";
        if (emailRef.current) emailRef.current.value = "";
        if (passwordRef.current) passwordRef.current.value = "";

        // Show success modal
        setShowModal(true);
      }
    } catch (error) {
      setError("Error, try again");
      console.log("Error", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleGoToLogin = () => {
    router.push("/login");
  };

  return (
    <section className="bg-[url('/images/SliderBanner.jpg')] bg-cover bg-center relative flex justify-center items-center flex-col gap-10 h-screen">
      <div className="absolute inset-0 bg-black bg-opacity-20 z-0"></div>

      <div className="relative z-10 w-full max-w-md bg-transparent/60 rounded-lg shadow-lg p-8 text-goldenYellow">
        {showModal ? (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="bg-grayBG p-8 rounded-lg shadow-lg max-w-sm w-full text-center text-goldenYellow">
              <div className="flex justify-center mb-4">
                {/* Success icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-white bg-oliveGreen rounded-full"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-4">
                Welcome to our PizzaHub Club!
              </h2>
              <p className="mb-4 font-semibold">
                Please proceed to login page and make an order, or create your
                delicious pizza.
              </p>
              <button
                onClick={handleGoToLogin}
                className="w-full py-2 px-4 bg-oliveGreen text-white font-semibold rounded-lg hover:bg-goldenYellow transition duration-200"
              >
                Go to Login Page
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Let’s Make it Official!
            </h2>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-bold mb-2"
              >
                Username
              </label>
              <input
                ref={usernameRef}
                id="username"
                type="text"
                required
                placeholder="Enter your username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-goldenYellow focus:border-goldenYellow"
              />
            </div>

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
              Register
            </button>
          </form>
        )}

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-oliveGreen font-bold hover:underline"
          >
            Login here
          </a>
        </p>
      </div>
    </section>
  );
};

export default RegisterPage;

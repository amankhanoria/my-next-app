"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      // signUp request
      const response = await axios.post("/api/users/signUp", user);
      console.log("Sign Up Success", response.data);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          {loading ? "Processing..." : "Sign Up"}
        </h1>
        <hr className="mb-6" />
        <label htmlFor="username" className="block text-lg font-medium mb-2 text-gray-700">
          Username
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:border-blue-500"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Enter your username"
        />
        <label htmlFor="email" className="block text-lg font-medium mb-2 text-gray-700">
          Email
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:border-blue-500"
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter your email"
        />
        <label htmlFor="password" className="block text-lg font-medium mb-2 text-gray-700">
          Password
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:border-blue-500"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter your password"
        />
        <button
          className={`p-2 w-full rounded-lg text-white mb-4 ${
            buttonDisabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={onSignUp}
          disabled={buttonDisabled}
        >
          {buttonDisabled ? "Fill in all fields" : "Sign Up"}
        </button>
        <hr className="mb-4" />
        <Link href="/login" className="text-blue-600 hover:underline text-center block">
          Visit login page
        </Link>
      </div>
    </div>
  );
}

"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const loginPage = async () => {
    try {
      setLoading(true);
      // login request
      const response = await axios.post("/api/users/login", user);
      console.log("Login Success", response);
      router.push(`/profile/${response.data.result._id}`);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">
          {loading ? "Processing..." : "Login"}
        </h1>
        <hr className="mb-6" />
        <label htmlFor="email" className="block text-lg font-medium mb-2 text-gray-700">
          Email
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:border-purple-500"
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
          className="p-2 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:border-purple-500"
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
              : "bg-purple-600 hover:bg-purple-700"
          }`}
          onClick={loginPage}
          disabled={buttonDisabled}
        >
          Login Here
        </button>
        <hr className="mb-4" />
        <Link href="/signUp" className="text-purple-600 hover:underline text-center block">
          Visit SignUp page
        </Link>
      </div>
    </div>
  );
}

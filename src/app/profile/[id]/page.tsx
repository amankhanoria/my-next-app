"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function UserProfilePage({ params }: any) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/users/profile/${params.id}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
    fetchUserData();
  }, [params.id]);

  console.log("user---", user);

  const deleteUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/users/deleteUser/${params.id}`);
      console.log("Delete Success", response.data);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const seeNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/users/getNotes/${params.id}`);
      console.log("seeNotes Success", response.data);
      router.push(`/seeNotes/${params.id}`);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-purple-400 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {loading ? (
          <p className="text-center text-xl font-semibold text-blue-700">Loading...</p>
        ) : user ? (
          <>
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Profile</h1>
            <hr className="mb-6" />
            <p className="text-lg font-medium mb-4">Username: {user.userDetails.username}</p>
            <p className="text-lg font-medium mb-6">Email: {user.userDetails.email}</p>
            <button
              className="p-2 w-full rounded-lg text-white mb-4 bg-blue-600 hover:bg-blue-700"
              onClick={seeNotes}
            >
              See Notes
            </button>
            {/* <button
              className="p-2 w-full rounded-lg text-white bg-red-600 hover:bg-red-700"
              onClick={deleteUser}
            >
              Delete Account
            </button> */}
          </>
        ) : (
          <p className="text-center text-xl font-semibold text-red-700">User not found</p>
        )}
      </div>
    </div>
  );
}

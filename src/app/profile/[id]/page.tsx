"use client";
import React, { useEffect, useState} from "react";
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

  console.log("user---",user);

  const deleteUser = async () => {
    try {
      setLoading(true)
      // signUp request
      const response = await axios.get(`/api/users/deleteUser/${params.id}`)
      console.log("Delete Success", response.data);
      router.push("/login")
      
    } catch (error : any) {
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  };
  
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <>
          <h1>Profile</h1>
          <hr />
          <p>Username: {user.userDetails.username}</p>
          <p>Email: {user.userDetails.email}</p>
          <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" onClick={deleteUser}>Delete Account</button>
        </>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
}

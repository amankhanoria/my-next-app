"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image"

export default function EditUserPage({ params }: any) {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
    mobile: "",
    gender: "",
    address: "",
    pic: ""
  });

  const [picFile, setPicFile] = React.useState<File | null>(null);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
      const response = await axios.get(`/api/users/profile/${params.id}`);
      const userDetails = response.data.userDetails;
      
      // Convert binary data to Base64 string
      console.log("userDetails--",{userDetails});
      let picBase64 = null;
      if(userDetails?.pic?.data){
        picBase64 = `data:image/png;base64,${btoa(
          new Uint8Array(userDetails.pic.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        )}`;
      }

      setUser({ ...userDetails, pic: picBase64 });
      setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
    fetchUserData();
  }, [params.id]);

  const updateUser = async () => {
    try {

      console.log("params.id------------------------------",params.id);
      
      setLoading(true);
      const formData = new FormData();
      formData.append("email", user.email);
      formData.append("mobile", user.mobile);
      formData.append("address", user.address);
      formData.append("gender", user.gender);
      formData.append("username", user.username)
      if (picFile) {
        formData.append("pic", picFile);
      }

      const response = await axios.put(`/api/users/editUser/${params.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log("seeNotes Success", response.data);
      router.push(`/profile/${params.id}`);
    } catch (error: any) {
      console.error("Error updating user:::::::::::::::::::::::", error); // Debugging line
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setPicFile(file);
      console.log("pic pic pic  ----------------",URL.createObjectURL(file));
      console.log("user pic pic pic  ----------------",user.pic);
      
      setUser({ ...user, pic: URL.createObjectURL(file) });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">
          {loading ? "Processing..." : "Edit Your Profile"}
        </h1>
        <hr className="mb-6" />
        <div className="flex flex-col items-center mb-4">
            <Image
              // src={user.pic}
              src={(user?.pic)? user.pic : picFile ? URL.createObjectURL(picFile) : "/images.png"}
              alt="Profile Picture"
              className="w-24 h-24 rounded-full mb-4 object-cover"
              height={96}
              width={96}
              onClick={() => document.getElementById('fileInput')?.click()}
            />
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <label htmlFor="username" className="block text-lg font-medium mb-2 text-gray-700">
          Username
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:border-purple-500"
          id="username"
          type="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Enter your username"
        />
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
        <label htmlFor="mobile" className="block text-lg font-medium mb-2 text-gray-700">
          Mobile Number
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:border-purple-500"
          id="mobile"
          type="text"
          value={user.mobile}
          onChange={(e) => setUser({ ...user, mobile: e.target.value })}
          placeholder="Enter your mobile number"
        />
        <label htmlFor="address" className="block text-lg font-medium mb-2 text-gray-700">
          Address
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:border-purple-500"
          id="address"
          type="text"
          value={user.address}
          onChange={(e) => setUser({ ...user, address: e.target.value })}
          placeholder="Enter your address"
        />
        <label htmlFor="gender" className="block text-lg font-medium mb-2 text-gray-700">
          Gender
        </label>
        <select
          id="gender"
          value={user.gender}
          onChange={(e) => setUser({ ...user, gender: e.target.value })}
          className="p-2 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:border-purple-500"
        >
          <option value="" disabled>Select your gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button
          className={`p-2 w-full rounded-lg text-white mb-4 ${
            buttonDisabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
          onClick={updateUser}
          disabled={buttonDisabled}
        >
          Submit
        </button>
        <hr className="mb-4" />
        <Link href="/signUp" className="text-purple-600 hover:underline text-center block">
          Visit SignUp page
        </Link>
      </div>
    </div>
  );
}
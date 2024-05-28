"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "../../app/styles.css";
import toast from "react-hot-toast";
interface EditUserModalProps {
  userId: string;
  username: string;
  email: string;
  closeModal: () => void;
  updateUser: (
    userId: string,
    userData: { username: string; email: string }
  ) => void;
}

function EditUserModal({
  userId,
  username,
  email,
  closeModal,
  updateUser,
}: EditUserModalProps) {
  const [newUsername, setNewUsername] = useState(username);
  const [newEmail, setNewEmail] = useState(email);

  const handleSave = async () => {
    try {
      await updateUser(userId, { username: newUsername, email: newEmail });
      closeModal();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="moda">
      <div className="moda-content">
        <span className="clos" onClick={closeModal}>
          &times;
        </span>
        <h2 className="moda-title">Edit User</h2>
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          className="moda-input"
        />
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="moda-input"
        />
        <button onClick={handleSave} className="moda-btn">
          Save
        </button>
      </div>
    </div>
  );
}

export default function UserProfilePage({ }: any) {
  const router = useRouter();
  const [users, setUsers] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const size = 5;

  useEffect(() => {
    fetchUserData();
  }, [currentPage]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/users/allUsers?page=${currentPage}&size=${size}`
      );
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  console.log("user---", users);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleView = async (userId: string) => {
    try {
      setLoading(true);
      router.push(`/profile/${userId}`);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingUser(null);
  };

  const handleUpdateUser = async (userId: string, userData: any) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `/api/users/updateUser/${userId}`,
        userData
      );
      console.log("Update Success", response);
      await fetchUserData();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/users/deleteUser/${userId}`);
      console.log("Delete Success", response.data);
      await fetchUserData();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r">
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : users && users.userDetails.length > 0 ? (
        <>
          <h1 className="page-title">User Profiles</h1>
          <table className="user-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.userDetails.map((user: any) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="action-btn view"
                      onClick={() => handleView(user._id)}
                    >
                      View
                    </button>
                    <button
                      className="action-btn edit"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>No users found</p>
      )}
  
      <div className="pagination">
        <button
          className="pagination-btn"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button className="pagination-btn" onClick={nextPage}>
          Next
        </button>
      </div>
      {showEditModal && editingUser && (
        <EditUserModal
          userId={editingUser._id} // Pass the userId separately
          username={editingUser.username} // Pass username separately
          email={editingUser.email} // Pass email separately
          closeModal={handleCloseEditModal}
          updateUser={handleUpdateUser}
        />
      )}
    </div>
    </div>
  );
  
  
}

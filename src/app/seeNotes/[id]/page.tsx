"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Modal from "react-modal";

// Set app element to body to ensure accessibility
if (typeof window !== "undefined") {
  Modal.setAppElement(document.body);
}

export default function UserProfilePage({ params }: any) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<any[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/users/getNotes/${params.id}`);
        console.log("response----", response.data.noteDetails);
        
        setUser(response.data);
        setNotes(response.data.noteDetails);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
    fetchUserData();
  }, [params.id]);

  console.log("see notes---", user);

  const createOrUpdateNote = async () => {
    try {
      setLoading(true);
      if (editId) {
        // Update note
        const response = await axios.put(`/api/users/updateNote/${params.id}`, { note, _id: editId });
        console.log("updateNote Success", response.data);
        const updatedNotes = notes.map(n => n._id === editId ? { ...n, note } : n);
        setNotes(updatedNotes);
        toast.success("Note updated successfully!");
      } else {
        // Create new note
        const response = await axios.post(`/api/users/createNotes/${params.id}`, { note });
        console.log("createNotes Success", response.data);
        setNotes([...notes, response.data]);
        toast.success("Note created successfully!");
      }
      setNote("");
      setEditId(null);
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (_id: string) => {
    try {
      setLoading(true);
      await axios.get(`/api/users/deleteNote/${_id}`);
      console.log("deleteNote Success");
      const updatedNotes = notes.filter(n => n._id !== _id);
      setNotes(updatedNotes);
      toast.success("Note deleted successfully!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (note: string, _id: string) => {
    setNote(note);
    setEditId(_id);
    setIsModalOpen(true);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <>
          <h1>Your Notes</h1>
          <hr />
          <ul>
            {notes.map(({ note, _id }) => (
              <li key={_id} className="p-2 border border-gray-300 rounded-lg mb-2">
                {note}
                <button
                  className="ml-2 p-1 border border-gray-300 rounded-lg bg-yellow-500 text-white hover:bg-yellow-700"
                  onClick={() => openEditModal(note, _id)}
                >
                  Edit
                </button>
                <button
                  className="ml-2 p-1 border border-gray-300 rounded-lg bg-red-500 text-white hover:bg-red-700"
                  onClick={() => deleteNote(_id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <button
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-blue-500 text-white hover:bg-blue-700"
            onClick={() => setIsModalOpen(true)}
          >
            Create Note
          </button>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            contentLabel="Create Note Modal"
          >
            <h2>{editId ? "Edit Note" : "Create a New Note"}</h2>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={5}
              cols={40}
              className="p-2 border border-gray-300 rounded-lg w-full mb-4"
            />
            <button
              className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
              onClick={createOrUpdateNote}
            >
              {editId ? "Update Note" : "Save Note"}
            </button>
            <button
              className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </Modal>
        </>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
}

import Modal from 'react-modal';
import "../app/styles.css";

const modal = () => {
  <Modal
  isOpen={isModalOpen}
  onRequestClose={() => setIsModalOpen(false)}
  contentLabel="Create Note Modal"
  className="modal"
  overlayClassName="overlay"
>
  <div className="modal-content">
    <h2 className="text-xl font-bold mb-4 text-blue-700">{editId ? "Edit Note" : "Create a New Note"}</h2>
    <textarea
      value={note}
      onChange={(e) => setNote(e.target.value)}
      rows={5}
      cols={40}
      className="p-2 border border-gray-300 rounded-lg w-full mb-4 focus:outline-none focus:border-blue-500"
      placeholder="Enter your note here..."
    />
    <div className="flex justify-end">
      <button
        className="button-primary"
        onClick={createOrUpdateNote}
      >
        {editId ? "Update Note" : "Save Note"}
      </button>
      <button
        className="button-secondary"
        onClick={() => setIsModalOpen(false)}
      >
        Cancel
      </button>
    </div>
  </div>
</Modal>

};

export default modal;
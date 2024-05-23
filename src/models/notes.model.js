import mongoose from "mongoose";
const notesSchema = new mongoose.Schema({
  note: {
    type : String,
    required: [true, "Please provide notes."],
  },
  user_id: {
    type : String,
    required: [true, "Please provide user_id."],
  },
  
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date
});

const Note = mongoose.models.notes || mongoose.model("notes", notesSchema)

export default Note;
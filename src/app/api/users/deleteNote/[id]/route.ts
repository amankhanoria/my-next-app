import { connect } from "@/dbConfig/dbConfig";
import Note from "@/models/notes.model";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
    
    const url = new URL(request.url);
    const noteId = url.pathname.split('/').pop();
    console.log("noteId---",noteId);
    
    const noteDetails = await Note.findById(noteId);

    if (!noteDetails) {
      return NextResponse.json({
        message: "Note not found.",
        success: false,
      }, { status: 404 });
    }

    await Note.deleteOne({_id: noteId});

    return NextResponse.json({
      message: "Note deleted successfully.",
      success: true,
    });

  } catch (error: any) {
    console.log("error---", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

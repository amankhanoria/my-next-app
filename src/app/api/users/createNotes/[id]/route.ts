import { connect } from "@/dbConfig/dbConfig";
import Note from "@/models/notes.model";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const userId = url.pathname.split('/').pop();
    const reqBody = await request.json()
    let {note} = reqBody;
    console.log("req.body ===", reqBody);

    const newNote = new Note({
      note,
      user_id : userId
    });
    const savedNote = await newNote.save();
    console.log("savedNote-----", savedNote);
    return NextResponse.json({
      message: "Note created successfully.",
      success: true,
      savedNote
    });

  } catch (error: any) {
    console.log("error---", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { connect } from "@/dbConfig/dbConfig";
import Note from "@/models/notes.model";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const userId = url.pathname.split('/').pop();
    const noteDetails = await Note.find({ user_id: userId });

    if (!noteDetails) {
      return NextResponse.json({
        message: "User not found.",
        success: false,
      }, { status: 404 });
    }
    console.log("noteDetails-----",noteDetails);
    
    return NextResponse.json({
      message: "Record fetched successfully.",
      success: true,
      noteDetails
    });
  } catch (error: any) {
    console.log("error---", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

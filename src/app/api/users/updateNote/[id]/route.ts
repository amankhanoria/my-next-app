import { connect } from "@/dbConfig/dbConfig";
import Note from "@/models/notes.model";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const userId = url.pathname.split('/').pop();
    const reqBody = await request.json()
    let {note, id} = reqBody;
    console.log("req.body ===", reqBody);

    await Note.updateOne({ _id: id }, { note });

    return NextResponse.json({
      message: "Note updated successfully.",
      success: true,
    });

  } catch (error: any) {
    console.log("error---", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

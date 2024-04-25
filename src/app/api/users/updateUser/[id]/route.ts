import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import url from "url";
connect();

export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const userId = url.pathname.split('/').pop();
    const reqBody = await request.json()
    const {username, email} = reqBody;
    console.log("id---",userId, username, email);

    await User.updateOne({ _id: userId }, { username, email });
    return NextResponse.json({
      message: "User updated successfully.",
      success: true,
    });

  } catch (error: any) {
    console.log("error---", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

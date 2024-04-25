import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const userId = url.pathname.split('/').pop();
    const userDetails = await User.findById(userId);

    if (!userDetails) {
      return NextResponse.json({
        message: "User not found.",
        success: false,
      }, { status: 404 });
    }

    await User.deleteOne({_id : userId});

    return NextResponse.json({
      message: "User deleted successfully.",
      success: true,
    });
  } catch (error: any) {
    console.log("error---", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

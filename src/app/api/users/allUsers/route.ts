import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import url from "url";
connect();

export async function GET(request: NextRequest) {
  try {
    const { query } = url.parse(request.url, true);
    const { page, size } = query;
    console.log("Page:", page);
    console.log("Size:", size);

    const limitValue = size ? size : 5;
    console.log("limitValue----",limitValue);
    
    const offsetValue = page? (parseInt(page as string) - 1) * parseInt(limitValue as string): 0;
    const userDetails = await User.find().sort({ _id: -1 }).limit(parseInt(limitValue as string)).skip(offsetValue);

    const getUsersCount = await User.countDocuments();

    // if (!userDetails.length) {
    //   return NextResponse.json({
    //     message: "Users not found.",
    //     success: false,
    //   }, { status: 404 });
    // }

    return NextResponse.json({
      message: "Record fetched successfully.",
      success: true,
      userDetails: userDetails,
      totalUsers: getUsersCount
    });
  } catch (error: any) {
    console.log("error---", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

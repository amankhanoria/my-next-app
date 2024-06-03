import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
import url from "url";
connect();

export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const userId = url.pathname.split('/').pop();
    const formData = await request.formData();
    const username = formData.get('username');
    const email = formData.get('email');
    const mobile = formData.get('mobile');
    const address = formData.get('address');
    const gender = formData.get('gender');
    // const pic = Formdata.get('pic');
    let pic = null
    if (formData.has('pic')) {
      // Access the uploaded file from the 'pic' field
      const picFile = formData.get('pic') as File;

      const picBuffer = await picFile.arrayBuffer();
      pic = Buffer.from(picBuffer)
    }

    console.log("id---",{username, email, mobile, address, gender, pic} );

    await User.updateOne({ _id: userId }, { username, email, mobile, address, gender, pic });
    return NextResponse.json({
      message: "User updated successfully.",
      success: true,
    });

  } catch (error: any) {
    console.log("error---", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

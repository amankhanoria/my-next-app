// import {connect} from "@/dbConfig/dbConfig";
// import User from "@/models/user.model";
// import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs"

// connect()

// export async function GET(request: NextRequest){
//   try {
//     // const userId = request.para
//     console.log("req.body ===", request);

    
//     return NextResponse.json({
//       message: "Record fetched successfully.",
//       success: true,
//       // savedUser
//     })
    
//   } catch (error: any) {
//     console.log("error---", error);
//     return NextResponse.json({error : error.message},{status : 500})
//   }
// }
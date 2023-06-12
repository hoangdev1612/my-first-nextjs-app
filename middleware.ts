import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

const middleware = async (req: NextRequest, res: NextResponse) => {
  const authToken = req.headers.get("authorization");
  if (!authToken) {
    return new NextResponse(
      JSON.stringify({
        message: "Unauthorized",
      })
    );
  }
  const token = authToken?.split(" ")[1];
  if (!token) {
    return new NextResponse(
      JSON.stringify({
        message: "Unauthorized",
      })
    );
  }
  try {
    await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Unauthorized",
      })
    );
  }
  console.log(token);
};

export default middleware;

export const config = {
  matcher: ["/api/auth/me"],
};

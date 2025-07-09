import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const { userId } = await req.json(); // userId 받아옴

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const publicId = "avatar";
  const folder = `UserAvatar/${userId}`;

  const stringToSign = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}`;
  const apiSecret = process.env.CLOUDINARY_API_SECRET!;
  const signature = crypto.createHash("sha1").update(stringToSign + apiSecret).digest("hex");

  return NextResponse.json({
    signature,
    timestamp,
    publicId,
    folder,
    apiKey: process.env.CLOUDINARY_API_KEY!,
  });
}

import { NextResponse } from "next/server";
import crypto from "crypto";
import { getUser } from "@/lib/getUser";

export async function POST(req: Request) {
  const user = await getUser();
  const { publicId } = await req.json();

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const folder = `Products/${user.id}`;

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

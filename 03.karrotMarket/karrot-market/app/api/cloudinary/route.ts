import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

function generateCloudinarySignature(publicId: string) {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const paramsToSign = `public_id=${publicId}&timestamp=${timestamp}`;
  const apiSecret = process.env.CLOUDINARY_API_SECRET!;
  console.log("API SECRET:", apiSecret); 
  const signature = crypto
    .createHash("sha1")
    .update(paramsToSign + apiSecret)
    .digest("hex");
    
  console.log("API", process.env.CLOUDINARY_API_KEY ); 
  return {
    signature,
    timestamp,
    publicId,
    apiKey: process.env.CLOUDINARY_API_KEY!,
  };
}

export async function POST(req: NextRequest) {
  const { publicId } = await req.json();
  const sig = generateCloudinarySignature(publicId);
  return NextResponse.json(sig);
}
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

function generateCloudinarySignature(publicId: string, options: Record<string, string>) {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const apiSecret = process.env.CLOUDINARY_API_SECRET!;

  const params = {
    public_id: publicId,
    timestamp,
    ...options,
  };
  
  const paramsToSign = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join("&");

  const signature = crypto.createHash("sha1").update(paramsToSign + apiSecret).digest("hex");
    
  return { signature, timestamp, publicId, apiKey: process.env.CLOUDINARY_API_KEY! };
}

export async function POST(req: NextRequest) {
  const { publicId, options } = await req.json();
  const sig = generateCloudinarySignature(publicId, options || {});
  return NextResponse.json(sig);
}
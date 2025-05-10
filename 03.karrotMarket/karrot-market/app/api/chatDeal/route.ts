import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request:NextRequest){
  const { productId } = await request.json();
  await db.product.update({
    where: {id: productId},
    data: {dealt: true}
  })
  return NextResponse.json({ ok: true });
}
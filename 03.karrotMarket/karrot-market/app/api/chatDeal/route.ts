import db from "@/lib/db";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request:NextRequest){
  const { productId } = await request.json();
  await db.product.update({
    where: {id: productId},
    data: {dealt: true}
  });
  revalidateTag('products');
  return NextResponse.json({ ok: true });
}
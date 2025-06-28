"use server"

import { USERNAME_REGEX } from "@/lib/constants"
import db from "@/lib/db"
import getSession from "@/lib/session"
import { supabaseClient } from "@/lib/supabaseClient"
import { revalidatePath } from "next/cache"
import path from "path"
import { z } from "zod"

const userProfileSchema  = z.object({
  photo: z.string().min(1, "상품 사진은 필수입니다"),
  username: z.string({
    invalid_type_error: 'Username은 문자이어야 합니다.',
    required_error: 'Username을 입력해주세요'
  }).min(2, '2자 이상 입력해주세요').max(10, '10자 이하 입력해주세요').trim().regex(USERNAME_REGEX, '특수문자를 제외하고 입력해주세요')
})

export async function updateUserProfile(formData: FormData) {
  const session = await getSession();
  const userData = {
    username: formData.get('username'),
    photo: formData.get('photo'),
  }
  
  if(userData.photo instanceof File){
    // const photoData = await data.photo.arrayBuffer()
    const ext = path.extname(userData.photo.name) // ".png", ".jpg" 같은 확장자만 추출
    const fileName = `avatar${ext}`
    const pathInBucket = `userAvatar/${session.id}/${fileName}`

    // 개인 폴더 만들기
    // const userFolderPath = path.join(process.cwd(), "public", "userAvatar", session.id!.toString())
    // await fs.mkdir(userFolderPath, { recursive: true })

    // 폴더 이미지 덮어쓰기
    // const filePath = path.join(userFolderPath, fileName)
    // await fs.writeFile(filePath, Buffer.from(photoData))

    // 브라우저에서 접근 가능한 경로로 저장
    // data.photo = `/userAvatar/${session.id}/${fileName}?v=${Date.now()}`

    const { error } = await supabaseClient.storage
    .from("carrot-user-avatar")
    .upload(pathInBucket, userData.photo, {
      upsert: true,
      contentType: userData.photo.type,
    })
    if (error) throw new Error("이미지 업로드 실패")

    const { data } = supabaseClient.storage
    .from("carrot-user-avatar")
    .getPublicUrl(pathInBucket)
    const publicUrl = data.publicUrl;
    userData.photo = publicUrl;
  }

  const result = userProfileSchema.safeParse(userData)
  if(!result.success){
    return result.error.flatten();
  }
  else {
    if(session.id){
      const existingUser = await db.user.findUnique({
        where: { username: result.data.username }
      })
      // 본인이 아니면서 같은 username이 있으면 중복 오류
      if (existingUser && existingUser.id !== session.id) {
        return {
          fieldErrors: {
            username: ['이미 사용 중인 닉네임 입니다.']
          }
        }
      }
  
      await db.user.update({
        where: {id: session.id},
        data: {
          avatar: result.data.photo,
          username: result.data.username,
        }
      });
      revalidatePath('/')
    }
  }
}
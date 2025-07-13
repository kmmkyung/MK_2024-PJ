"use client"

import { useUserContext } from "@/context/userContext";
import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Input from "@/components/Input";
import { updateUserProfile } from "./action";
import NavProfile from "@/components/NavProfile";
import Button from "@/components/Button";

export default function UserEdit() {
  const { user } = useUserContext();
  const [userName, setUserName] = useState<string>(user!.username);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(user?.avatar || "");
  const [errors, setErrors] = useState<{ [key: string]: string[] } | null>(null);
  const [uploading, setUploading] = useState(false); // 업로드 진행 상태

  async function getSignature(userId: number) {
    const res = await fetch("/api/cloudinaryAvatar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    if (!res.ok) throw new Error("서명 생성 실패");
    return res.json(); // { signature, timestamp, publicId, folder, apiKey }
  }
  
  async function uploadToCloudinary(file: File, userId: number): Promise<string | null> {
    setUploading(true);
    try {
      const { signature, timestamp, apiKey, publicId, folder } = await getSignature(userId);
  
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("public_id", publicId);
      formData.append("folder", folder);
      formData.append("signature", signature);
  
      const res = await fetch("https://api.cloudinary.com/v1_1/carrotmarket/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
  
      if (!res.ok) {
        console.error("Cloudinary upload failed:", data);
        return null;
      }
      return data.secure_url;
    } finally {
      setUploading(false);
    }
  }

  async function onImageChange(event:React.ChangeEvent<HTMLInputElement>){
    const files = event.target.files;
    if(!files) return;
  
    const file = files[0];
    if (!file.type.startsWith("image/")) {
      window.alert("이미지 파일만 업로드할 수 있습니다");
      return;
    }
    const fileSize = file.size / (1024 * 1024);
    if (fileSize > 3) {
      window.alert("이미지 크기가 3MB 미만 이미지를 올려주세요");
      return;
    }
    setImgFile(file);
    setPreview(URL.createObjectURL(file));
    const url = await uploadToCloudinary(file, user!.id);
    if (url) setPreview(url);
  }

  async function onSubmit(){
    const formData = new FormData();
    formData.append("username", userName);
    if(imgFile){
      formData.append("photo", preview);
    } else {
      formData.append("photo", user!.avatar || "");
    }
    const profile = await updateUserProfile(formData);
    if (profile?.fieldErrors) {
      setErrors(profile.fieldErrors);
    }
    else{
      setErrors(null);
    }
  }

  return (
    <section className="px-10 pt-10 pb-[70px] md:pb-10 h-full w-full">
      <div className="flex items-center justify-between mb-5">
        <h6 className="text-primary text-base font-semibold">개인 정보</h6>
        <NavProfile/>
      </div>
      <form className="h-[calc(100%-44px)] flex flex-col gap-5 justify-between" action={onSubmit}>
        <div className="flex flex-col gap-5">
          <div className="size-16 m-auto">
            <label htmlFor="photo" className="border-2 border-neutral-400 aspect-square block text-neutral-400 rounded-full border-dashed cursor-pointer bg-center bg-cover" style={{backgroundImage:`url(${preview})`} }>
              {preview === ""?
              <>
                <PhotoIcon className="size-20"/>
                <div className="text-sm text-neutral-400">사진을 추가해 주세요</div>
              </> : null
              }
              <input onChange={onImageChange} className="hidden" type="file" id="photo" name="photo" accept="image/*" />
            </label>
          </div>
          <div className="flex gap-5 items-top">
            <label className="text-sm flex-shrink-0 h-10 leading-10">닉네임</label>
            <Input name="username" type="text" placeholder="2~10자 닉네임을 입력해주세요" autoComplete="name" minLength={2} maxLength={10} required defaultValue={user?.username} errors={errors?.username} onChange={(event)=>setUserName(event.target.value)}/>
          </div>
          <div className="flex gap-5 items-center">
            <label className="text-sm flex-shrink-0">이메일</label>
            <Input name="email" type="email" autoComplete="email" readOnly required defaultValue={user?.email?.toString()}/>
          </div>
        </div>
        <div className="mb-5 md:mb-0">
          {uploading && <p className="mb-2 text-primary text-sm text-center font-bold">이미지 변환중입니다. 잠시만 기다려주세요!</p>}
          <Button text="수정하기" uploading={uploading}/>
        </div>
      </form>
    </section>
  )
}
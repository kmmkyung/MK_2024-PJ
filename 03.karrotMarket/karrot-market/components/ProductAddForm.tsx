"use client"

import Button from "@/components/Button";
import Input from "@/components/Input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useActionState, useState } from "react";
import { CategoryType } from "@prisma/client";
import { uploadProduct } from "@/app/(ProductAddAndEdit)/product/add/action";

export default function ProductAddForm(){
  const [ state, action ] = useActionState(uploadProduct, null)
  const { errors, data } = state || {};
  const [ category, setCategory ] = useState(data?.category as CategoryType);
  const [ preview, setPreview ] = useState('');
  const [ cloudinaryUrl, setCloudinaryUrl ] = useState("");
  const [ uploading, setUploading ] = useState(false); // 업로드 진행 상태

  async function getSignature() {
    const res = await fetch("/api/cloudinaryProducts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("서명 생성 실패");
    return res.json(); // { signature, timestamp, publicId, folder, apiKey }
  }
  
  async function uploadToCloudinary(file: File): Promise<string | null> {
    setUploading(true);
    try {
      const { signature, timestamp, apiKey, publicId, folder } = await getSignature();
  
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
    setPreview(URL.createObjectURL(file));
    const url = await uploadToCloudinary(file);
    if (url) {
      setPreview(url);
      setCloudinaryUrl(url);
    }
  }

  function onChange(event:React.ChangeEvent<HTMLSelectElement>){
    setCategory(event.target.value as CategoryType)
  }

  return (
  <form action={action} className="flex flex-col gap-5 md:flex-row">
    <div className="md:w-1/2">
      <label htmlFor="photo" className={`border-2 aspect-square flex flex-col items-center justify-center rounded-2xl border-dashed cursor-pointer bg-center bg-cover ${errors?.fieldErrors.photo ? "border-red-500": "border-neutral-400"}`}
      style={{backgroundImage:`url(${preview})`}}
      >
        {preview === ""?
        <>
          <PhotoIcon className={`size-20 ${errors?.fieldErrors.photo ? "text-red-500":"text-neutral-400"}`}/>
          <div className={`text-sm ${errors?.fieldErrors.photo ? "text-red-500" : "text-neutral-400"}`}>3MB 미만 이미지를 추가해 주세요</div>
        </> : null
        }
      </label>
      <input onChange={onImageChange} className="hidden" type="file" id="photo" name="imageFile" accept="image/*"/>
      {/* 클라우디너리 URL을 폼 데이터에 추가 */}
      <input type="hidden" name="photo" value={cloudinaryUrl} />
      {/* 폼데이터 제출 후 이미지 리셋 방지 */}
      {data?.photo && <input name="existingPhoto" type="hidden" value={data?.photo.toString()} /> }
      {errors?.fieldErrors.photo && <p className="text-red-500 mt-3 text-sm">{errors.fieldErrors.photo}</p>}
    </div>
    <div className="md:w-1/2 flex flex-col gap-3">
      <select key={data?.category ?? ""} name="category" defaultValue={category} required className="text-sm bg-transparent rounded-md w-full ring-2 focus:ring-3 ring-neutral-400 focus:ring-primary border-none placeholder:text-neutral-400 transition-all" onChange={onChange}>
        <option value="" hidden>카테고리를 선택하세요</option>
        <option value="Furniture">Furniture</option>
        <option value="Electronics">Electronics</option>
        <option value="Home_Garden">Home_Garden</option>
        <option value="Baby_Kids">Baby_Kids</option>
        <option value="Fashion">Fashion</option>
        <option value="Health_Beauty">Health_Beauty</option>
        <option value="Hobbies">Hobbies</option>
        <option value="Books_Music">Books_Music</option>
        <option value="Pet">Pet</option>
        <option value="Other">Other</option>
      </select>
      <Input name="title" placeholder="제목" type="text" required errors={errors?.fieldErrors.title} defaultValue={data?.title?.toString()}/>
      <Input name="price" placeholder="가격을 입력해 주세요" type="number" required errors={errors?.fieldErrors.price} defaultValue={data?.price?.toString()}/>
      <div>
        <textarea name="description" placeholder="게시글 내용을 작성해 주세요" required className="align-middle h-40 text-sm bg-transparent rounded-md w-full ring-2 focus:ring-3 ring-neutral-400 focus:ring-primary border-none placeholder:text-neutral-400 transition-all" defaultValue={data?.description?.toString()}/>
          {errors?.fieldErrors.description && errors.fieldErrors.description.map((ele,idx)=>{
            return <p key={idx} className="text-red-500 mt-3 text-sm">{ele}</p>
          })}
      </div>
      <Button text="작성 완료" uploading={uploading}/>
    </div>
  </form>
  )
}
"use client"

import Button from "@/components/Button";
import Input from "@/components/Input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useActionState, useState } from "react";
import { uploadProduct } from "./action";
import { CategoryType } from "@prisma/client";

export default function AddProduct(){
  const [preview, setPreview] = useState('')

  function onImageChange(event:React.ChangeEvent<HTMLInputElement>){
    const files = event.target.files;
    if(!files) return;

    const file = files[0];
    if (!file.type.startsWith("image/")) {
      window.alert("이미지 파일만 업로드할 수 있습니다");
      return;
    }
    const fileSize = file.size / (1024 * 1024);
    if (fileSize > 2) {
      window.alert("이미지 크기가 2MB 미만 이미지를 올려주세요");
      return;
    }
    const url = URL.createObjectURL(file)
    setPreview(url)
  }

  const [ state, action ] = useActionState(uploadProduct, null)
  const { errors, data } = state || {};
  const [category, setCategory] = useState(data?.category as CategoryType);
  
  function onChange(event:React.ChangeEvent<HTMLSelectElement>){
    setCategory(event.target.value as CategoryType)
  }

  return (
    <>
    <section className="setting-page pt-20">
      <form action={action} className="flex flex-col gap-5 md:flex-row">
        <div className="md:w-1/2">
          <label htmlFor="photo" className={`border-2 aspect-square flex flex-col items-center justify-center rounded-2xl border-dashed cursor-pointer bg-center bg-cover ${errors?.fieldErrors.photo ? "border-red-500": "border-neutral-400"}`}
          style={{backgroundImage:`url(${preview})`}}
          >
          {preview === ""?
          <>
            <PhotoIcon className={`size-20 ${errors?.fieldErrors.photo ? "text-red-500":"text-neutral-400"}`}/>
            <div className={`text-sm ${errors?.fieldErrors.photo ? "text-red-500" : "text-neutral-400"}`}>2MB 미만 이미지를 추가해 주세요</div>
          </> : null
          }
          </label>
          <input onChange={onImageChange} className="hidden" type="file" id="photo" name="photo" accept="image/*"/>
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
          <Button text="작성 완료"/>
        </div>
      </form>
    </section>
    </>
  )
}
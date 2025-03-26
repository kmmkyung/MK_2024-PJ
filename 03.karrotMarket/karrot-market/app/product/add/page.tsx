"use client"

import Button from "@/components/Button";
import Input from "@/components/Input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useActionState, useState } from "react";
import { uploadProduct } from "./actions";

export default function AddProduct(){
  const [preview, setPreview] = useState('')
  function onImageChange(event:React.ChangeEvent<HTMLInputElement>){
    const files = event.target.files;
    if(!files) return;

    const file = files[0];
    if(!file.type.startsWith('image/')) return { error: "이미지 파일만 업로드할 수 있습니다"}
    const fileSize = file.size / (1024*1024)
    if( fileSize > 3) {
      return { error: "이미지 크기가 3MD 미만 이미지를 올려주세요"}
    }
    const url = URL.createObjectURL(file)
    setPreview(url)
  }

  const [ state, action ] = useActionState(uploadProduct, null)

  return (
    <section className="setting-page">
      <form action={action} className="flex flex-col gap-5 md:flex-row">
        <div className="md:w-1/2">
          <label htmlFor="photo" className="border-2 border-neutral-400 aspect-square flex flex-col items-center justify-center text-neutral-400 rounded-2xl border-dashed cursor-pointer bg-center bg-cover"
          style={{backgroundImage:`url(${preview})`}}
          >
          {preview === ""?
          <>
            <PhotoIcon className="size-20"/>
            <div className="text-sm text-neutral-400">사진을 추가해 주세요</div>
            <p className="text-sm text-red-500">상품 사진은 필수입니다</p>
          </> : null
          }
          </label>
          <input onChange={onImageChange} required className="hidden" type="file" id="photo" name="photo" accept="image/*"/>
        </div>
        <div className="md:w-1/2 flex flex-col gap-3">
          <select name="category" required defaultValue="" className="text-sm bg-transparent rounded-md w-full ring-2 focus:ring-3 ring-neutral-400 focus:ring-primary border-none placeholder:text-neutral-400 transition-all">
            <option value="" disabled>카테고리를 선택하세요</option>
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
          <Input name="title" placeholder="제목" type="text" required errors={state?.fieldErrors.title}/>
          <Input name="price" placeholder="가격을 입력해 주세요" type="number" required errors={state?.fieldErrors.price}/>
          <div>

          <textarea name="description" placeholder="게시글 내용을 작성해 주세요" required className="align-middle h-40 text-sm bg-transparent rounded-md w-full ring-2 focus:ring-3 ring-neutral-400 focus:ring-primary border-none placeholder:text-neutral-400 transition-all" />
            {state?.fieldErrors.description && state.fieldErrors.description.map((ele,idx)=>{
              return <p key={idx} className="text-red-500 mt-3 text-sm">{ele}</p>
            })}
            </div>
          <Button text="작성 완료"/>
        </div>
      </form>
    </section>
  )
}
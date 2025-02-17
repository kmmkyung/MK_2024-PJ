'use server';

// import { redirect } from "next/navigation";

export async function onFormSubmit(prevState:any, formData:FormData){
  console.log(formData.get('email'), formData.get('password'));
  console.log(prevState);
  // redirect('/')
  return {errors :['wrong password','password short']}
}

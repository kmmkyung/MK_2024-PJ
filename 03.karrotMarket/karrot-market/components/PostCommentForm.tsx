import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

interface InitialComment {
  id: number;
  userId: number;
  payload: string;
  created_at: Date;
  user: {
    username: string;
    avatar: string | null;
  };
};
interface IPostCommentForm {
  handleSubmit: (formData: FormData) => void;
  state: {
    formErrors: string[] | null;
    newComment: InitialComment | null; 
  } | null | undefined;
}

export default function PostCommentForm({ handleSubmit, state }: IPostCommentForm){
  return (
    <div className="h-[70px] fixed w-full bottom-0 left-0 bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 border-t">
      <div className="relative md:max-w-screen-xl mx-auto px-10 h-full flex items-center justify-between w-full">
        {state?.formErrors ?
        <p className="absolute left-1/2 -top-3 -translate-x-1/2 text-red-500 text-xs px-4 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full">{state.formErrors}</p> : null}
        <form action={handleSubmit} className="flex gap-5 w-full">
          <input name="comment" type="text" placeholder="댓글을 입력해 주세요" min={1} max={200} required className="rounded-full border-0 bg-neutral-100 dark:bg-neutral-800 focus:ring-0 text-sm w-full"/>
          <button type="submit" className="size-9 rounded-full bg-primary hover:bg-primaryHover transition-all flex items-center justify-center flex-shrink-0 disabled:bg-neutral-300 disabled:cursor-not-allowed"><PaperAirplaneIcon className="size-5 text-white"/></button>
        </form>
      </div>
    </div>
  )
}
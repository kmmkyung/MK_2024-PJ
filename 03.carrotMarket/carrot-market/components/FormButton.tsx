interface IFormButtonProps{
  loading: boolean;
  text: string;
}

export default function FormButton({loading, text}:IFormButtonProps){
  return (
    <button disabled={loading} className="primary-btn disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed" type="submit">{loading? '로딩중입니다...' : text}</button>
  )
}
export function formatToWon(price: number){
  return price.toLocaleString('ko-KR')
}

export function formatToTimeAgo(date:string){
  const dayInMs = 1000*60*60*24
  const time = new Date(date).getTime();
  const nowTime = new Date().getTime();
  const diff = Math.round((time - nowTime)/dayInMs);

  const formatter = new Intl.RelativeTimeFormat('ko') // -3을 3일전 3을 3일로 바꿈

  return formatter.format(diff,"days")
}
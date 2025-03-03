export function formatToWon(price: number){
  return price.toLocaleString('ko-KR')
}

export function formatToTimeAgo(date:string){
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24
  const month = day * 30

  const dataTime = new Date(date).getTime();
  const nowTime = new Date().getTime();
  const diff = (dataTime - nowTime);
  const diffAbs = Math.abs(diff);
  
  const formatter = new Intl.RelativeTimeFormat('ko') // -3을 3일전 3을 3일로 바꿈

  if(diffAbs < minute){
    return formatter.format(Math.round(diff/1000), 'seconds')
  }
  else if(diffAbs < hour){
    return formatter.format(Math.round(diff/minute), 'minutes')
  }
  else if(diffAbs < day){
    return formatter.format(Math.round(diff/hour), 'hours')
  }
  else if(diffAbs < month){
    return formatter.format(Math.round(diff/day), 'days')
  }
  else{
    return formatter.format(Math.round(diff/month), 'months')
  }
}
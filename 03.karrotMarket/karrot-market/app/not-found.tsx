import Image from 'next/image';

export default function notFound(){
  return (
    <section className='w-screen h-screen flex flex-col items-center justify-center gap-3'>
      <Image width={30} height={30} src="/image/rabbit.png" alt="rabbit" />
      <p className='sm:text-xl text-base'>404 Not Found!!</p>
    </section>
  )
}
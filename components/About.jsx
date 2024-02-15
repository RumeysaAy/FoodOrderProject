import Image from "next/image";
import Title from "./ui/Title";

function About() {
  return (
    <div className='bg-secondary py-14'>
        <div className='container mx-auto flex
        items-center text-white gap-20 
        justify-center
        flex-wrap-reverse'>
            <div className="flex justify-center">
                <div className="relative sm:w-[445px] sm:h-[600px]
                flex justify-center w-[300px] h-[450px]">
                    <Image src="/images/about-img.png"
                    alt=""
                    fill/>
                </div>
            </div>
            <div className="md:w-1/2">
                <Title addClass="text-[40px]">Hakkımızda</Title>
                <p className="my-5 flex flex-col items-center">
                Dünyanın dört bir yanında yer alan 34 bini aşkın restoran
                ve 1,6 milyonu geçen çalışanımızla, günde ortalama
                58 milyon müşterimizi mutlu edebilmek için çalışıyoruz.
                </p>
                <button className="btn-primary">Devamını Oku</button>
            </div>
        </div>
    </div>
  )
}

export default About
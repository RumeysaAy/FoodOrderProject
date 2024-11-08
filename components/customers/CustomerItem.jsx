import Image from 'next/image';

const CustomerItem = ({imgSrc}) => {


  return (
    <div className='mt-5 mx-4'>
        <div className='
         p-6
         bg-secondary 
         text-white 
         rounded-[5px]
         '>
            <p>
                Cheeseburger gayet lezzetli ve doyurucuydu.
            </p>
            
        
            <div className='flex flex-col mt-4'>
                <span className='text-lg font-semibold'>Ayşe</span>
                <span className="text-[15px]">Harika!</span>
            </div>
        
        </div>


        <div className="relative w-28 h-28 border-4 border-primary rounded-full mt-8 before:content-[''] before:absolute before:top-0 
      flex justify-center before:-translate-y-3 before:rotate-45 before:bg-primary before:w-5 before:h-5" >
            <Image src={imgSrc} alt='' fill
            object-fit="contain"
            className='rounded-full'
            />
        </div>
        
    </div>
  )
}

export default CustomerItem;
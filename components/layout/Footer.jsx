
import React from 'react'
import Title from '../ui/Title'
import axios from 'axios'

const Footer = () => {
  const [footer, setFooter] = React.useState([])


  React.useEffect(() => {
    const getFooter = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/footer`);
        setFooter(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    }
    getFooter();
  }, [])
  // console.log(footer)




  return (
    <div className='bg-secondary text-white'>
      <div className='container mx-auto pt-16 pb-6'>
        <div className='flex 
        md:justify-between justify-center 
        text-center flex-wrap
        md:gap-y-0 gap-y-8'>

          <div className='md:flex-1'>
            <Title addClass="text-[30px]">Bize Ulaşın</Title>
            <div className='flex flex-col gap-y-2 mt-4'>
              {/* yeni bir sayfada acmasi icin: target="_blank"
              rel="noreferrer" */}
              <a href={footer?.location} target="_blank"
              rel="noreferrer">
                <i className="fa-solid fa-location-dot"></i>
                <span className='inline-block ml-2'>Konum</span>
              </a>
              <a href={`tel:${footer?.phoneNumber}`} >
                <i className="fa-solid fa-phone"></i>
                <span className='inline-block ml-2'>
                  Telefon +90 {footer?.phoneNumber}
                </span>
               </a>
          <a href={`mailto:${footer?.email}`}>
          <i className="fa-solid fa-envelope"></i>
          <span className='inline-block ml-2'>
            fastfood@gmail.com
          </span>
          </a>
            </div>
          </div>
          
          <div className='md:flex-1'>
            <Title addClass="text-[30px]">Burger</Title>
             <p className='mt-6'>
                {footer?.desc}
                
              </p>

              <div className='flex items-center justify-center mt-5 gap-x-1'>
                {footer?.socialMedia?.map((item) => (
                  <a
                  href={item?.link}
                  className='w-8 h-8 text-[26px] grid place-content-center 
                  rounded-full hover:text-primary text-white transition-all'
                  key={item._id}
                  target="_blank"
                  rel="noreferrer"
                  >
                    <i className={item.icon}></i>
                  </a>
                ))}
              </div>
              
          
          </div>

          <div className='md:flex-1'>
            <Title addClass="text-[30px]">Açılış Saatleri</Title>
            <div className='flex flex-col gap-y-2 mt-4'>
              <div>
                <span className='inline-block ml-2'>
                  {footer?.openingHours?.day}
                </span>
              </div>
              <div>
                <span className='inline-block ml-2'>
                  {footer?.openingHours?.hour}
                </span>
               </div>
         
            </div>
          </div>
</div>
         
            <p className='text-center mt-10'>
            Burger Corporation. Tüm Hakları saklıdır.
            </p>
         
        
        
        
        </div>
        



    </div>
  )
}

export default Footer
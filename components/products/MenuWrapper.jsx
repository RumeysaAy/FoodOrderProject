import React, {useEffect, useState} from 'react'
import Title from '../ui/Title'
import MenuItem from './MenuItem'

const MenuWrapper = ({ kategoriList, productList }) => {
  const [aktif, setAktif] = useState(0) // baslangic degeri:0
  // console.log(kategoriList);
  const [filter, setFilter] = useState([]);
  const [productLimit, setProductLimit] = useState(3);

  useEffect(() => {
    setFilter(productList.filter((product) => product.kategori === 
    kategoriList[aktif].title.toLowerCase()))
  }, [kategoriList,productList,aktif])


  return (
    <div className='container mx-auto mb-16'>
        <div className='flex flex-col items-center 
        w-full'>
            <Title addClass="text-[40px]">Menümüz</Title>
            <div className='mt-10'>
              {kategoriList && kategoriList.map((katg, index) => (
                <button 
                className={`px-6 py-3 rounded-3xl 
                ${index === aktif && "bg-secondary text-white"}`} 
                key={katg._id}
                onClick={() => {
                  setAktif(index);
                  setProductLimit(3); // farkli bir kategoriye tiklandiginda 3 tane urun gostersin
                }}
                >{katg.title}</button>
              ))}

            
        </div>
        </div>
        
        <div className='mt-8 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 '>
          {filter.length > 0 && 
          filter
          .slice(0,productLimit)
          .map((prdct)=> (
            <MenuItem key={prdct._id} product={prdct}/>
          ))}
        </div>
        <div className='flex items-center justify-center w-full mt-10'>
              <button className='btn-primary' onClick={() => setProductLimit(productLimit + 3)}>
                Daha Fazla Göster
              </button>
            </div>
    </div>

    
  )
}

export default MenuWrapper
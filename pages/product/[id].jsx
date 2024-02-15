/* eslint-disable react-hooks/rules-of-hooks */
import Image from 'next/image'
import Title from '../../components/ui/Title'
import React from 'react';
import  {useState} from 'react'
import { urunEkle } from '../../redux/sepet';
import { useDispatch, useSelector} from 'react-redux';
import axios from 'axios';




const index = ({food}) => {
    const [fiyatlar, setFiyatlar] = useState(food.fiyat);
    const [a, setFiyat] = useState(fiyatlar[0]);
    const [boyut, setBoyut] = useState(0);
    const [sos, setSos] = useState(food?.extraOptions);
    const [soslar, setSoslar] = useState([])
    
    const sepet = useSelector((state) => state.sepet)
    const findCart = sepet.urunler.find((item) => item._id === food._id)

    const dispatch = useDispatch();

    // console.log(food);

    const handleSize = (boyutIndex) =>{
        const fark = fiyatlar[boyutIndex] - fiyatlar[boyut];
        setBoyut(boyutIndex);
        changePrice(fark);
    }

    const changePrice = (number) => {
        setFiyat(a + number);
    }

    const handleChange = (e, item) => {
        const checked = e.target.checked;
        if(checked){
            changePrice(item.price);
            setSoslar([...soslar,item])
        }else{
            changePrice(-item.price);
            setSoslar(soslar.filter((ek)=>ek.id !== item.id))
        }
    }

    const handleClick=()=>{
        dispatch(urunEkle({...food, adet:1, soslar, a}))
    }

    // console.log(sepet);
  return (
    <div className='flex items-center md:h-[calc(100vh_-_88px)] gap-5
    py-20 flex-wrap'>
        <div className='relative md:flex-1 md:w-[80%] md:h-[80%]
        w-24 h-24 mx-28'>
            <Image className="w-full !h-auto"
            src={food?.img}
            alt='' 
            fill
            object-fit="contain"
            priority/>
        </div>
        <div className='md:flex-1 md:text-start text-center'>
            <Title addClass="text-6xl">{food?.baslik}</Title>
            <span className='text-primary text-2xl font-bold 
            underline underline-offset-1
            my-4 inline-block'>
                ${a}
            </span>
            <p className='text-sm my-4 md:pr-24'>
            {food?.tanitim}
            </p>
            <div>
                <h4 className='text-xl font-bold'>{food.kategori === "pizza" ? "Pizza boyutunu seçiniz":""}</h4>
                {food.kategori === "pizza" && (
                     <div className='flex items-center gap-x-20 
                md:justify-start justify-center'>
                    
                    <div className='relative w-8 h-8 cursor-pointer'
                    onClick={()=> handleSize(0)}>
                        <Image src="/images/size.png" alt='' fill priority/>
                        <span className='absolute top-0
                        -right-7 text-xs bg-primary rounded-full
                        px-[5px] font-medium'>Küçük</span>
                    </div>
                    <div className='relative w-12 h-12 cursor-pointer'
                    onClick={()=> handleSize(1)}>
                        <Image src="/images/size.png" alt='' fill priority/>
                        <span className='absolute top-0
                        -right-5 text-xs bg-primary rounded-full
                        px-[5px] font-medium'>Orta</span>
                    </div>
                    <div className='relative w-16 h-16 cursor-pointer'
                    onClick={()=> handleSize(2)}>
                        <Image src="/images/size.png" alt='' fill priority/>
                        <span className='absolute top-0
                        -right-4 text-xs bg-primary rounded-full
                        px-[5px] font-medium'>Büyük</span>
                    </div>
                </div>
                )}
               
                
                
            </div>

            <div className='flex gap-x-4 my-6
            md:justify-start justify-center'>
                {sos.map((item) => (
                    <label className='flex items-center gap-x-1'
                    key = {item._id}>
                    <input 
                    type="checkbox" 
                    className='w-5 h-5 accent-primary' 
                    onChange={(e) => handleChange(e, item)}/> 
                    <span className='text-sm font-semibold'>{item.text}</span>
                </label>
                ))}
                
            </div>
            <button className='btn-primary' 
            onClick={handleClick}
            disabled={findCart}
            >
                Sepete Ekle
            </button>

        </div>
    </div>
  )
}

export const getServerSideProps = async ({params}) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`)

    return {
        props:{
            food: res.data ? res.data : null,
        }
    }
}


export default index
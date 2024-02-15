import React, { useEffect, useState } from 'react'
import Title from '../ui/Title'
import Image from 'next/image'
import axios from 'axios';
import { produceWithPatches } from 'immer';
import { toast } from 'react-toastify';

const Urunler = () => {
  const [urunler, setUrunler] = useState([]);

  const handleDelete = async (id) => {
    try{
      if(confirm("Bu ürünü silmek istediğinize emin misiniz?")){
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
        if (res.status === 200) {
          toast.success("Ürün silindi.");
          getProducts();
        }
      }
    } catch (err) {
      console.log(err)
    }
  }


  const getProducts = async () => {
    try{
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      setUrunler(res.data)
    } catch (err) {
      console.log(err)
    }
  }
  

  useEffect(() => {getProducts();}, [])

  // console.log(urunler)

  return (
    <div className="lg:p-4 flex-1 lg:mt-0 mt-5">
      <Title addClass="text-[40px]">Ürünler</Title>
        <div className="overflow-x-auto w-full mt-5 !max-h-[400px]">
        <table className="w-full text-sm text-center text-gray-500
            xl:min-w-[1000px] ">
                <thead className="text-xs text-gray-400 uppercase
                bg-gray-700">
                    <tr>
                        <th scope="col" className="py-3 px-6">GÖRSEL</th>
                        <th scope="col" className="py-3 px-6">ID</th>
                        <th scope="col" className="py-3 px-6">ÜRÜN</th>
                        <th scope="col" className="py-3 px-6">FİYAT</th>
                        <th scope="col" className="py-3 px-6">İŞLEM</th>
                    </tr>
                    
                </thead>
                <tbody>
                    
                    {urunler.length > 0 && urunler.map((urun) => (
                      <tr className="transition-all bg-secondary border-gray-700
                      hover:bg-primary" key={urun._id}>
                          <td className="py-4 px-6 font-medium whitespace-nowrap
                          hover:text-white flex items-center gap-x-2 justify-center">
                              
                          <Image src={urun.img} alt={urun.title} width={50} height={50}/>
                          </td>
                        <td   className="py-4 px-6 font-medium whitespace-nowrap
                        hover:text-white"     >
                          <span>{urun._id.substring(0,8)}
                          </span>
                        </td>
                        <td    className="py-4 px-6 font-medium whitespace-nowrap
                        hover:text-white">{urun.baslik}</td>
                        <td    className="py-4 px-6 font-medium whitespace-nowrap
                       hover:text-white"    >₺{urun.fiyat[0]}</td>
                       <td   className="py-4 px-6 font-medium whitespace-nowrap
                        hover:text-white"     >
                          <button className='btn-primary !bg-danger'
                          onClick={() => handleDelete(urun._id)}
                          >
                            Sil
                            </button>
                        </td>
                      </tr>
                    )) }


                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Urunler
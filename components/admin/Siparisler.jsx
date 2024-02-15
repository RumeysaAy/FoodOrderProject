import axios from 'axios'
import Title from '../ui/Title'
import { useState, useEffect } from 'react'

const Siparisler = () => {
  // http://localhost:3000/api/orders 'daki siparisleri cekecegim
  // anlik degisim olmasi icin useEffect ile cekebilirm
  // anlik durum icin useState
  const [orders, setOrders] = useState([])
  const status = ["Hazırlanıyor","Yolda","Teslim Edildi"]
  // sayfa yuklendiginde useEffect calisir
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders`)
        setOrders(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getOrders()
  }, [])

  const handleStatus = async (id) => {
    const item = orders.find((order) => order._id === id);
    // su anki status
    const currentStatus = item.status
    try{
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
      {status: currentStatus + 1, })
      setOrders([res.data, ...orders.filter((order) => order._id !== id)])
    } catch (err){
      console.log(err)
    }
  }


  return (
    <div>
        <div className="lg:p-4 flex-1 lg:mt-0 mt-5">
      <Title addClass="text-[40px]">Siparişler</Title>
        <div className="overflow-x-auto w-full mt-5">
        <table className="w-full text-sm text-center text-gray-500
            xl:min-w-[1000px]">
                <thead className="text-xs text-gray-400 uppercase
                bg-gray-700">
                    <tr>
                        <th scope="col" className="py-3 px-6">ÜRÜN ID</th>
                        <th scope="col" className="py-3 px-6">MÜŞTERİ</th>
                        <th scope="col" className="py-3 px-6">TOPLAM</th>
                        <th scope="col" className="py-3 px-6">ÖDEME TİPİ</th>
                        <th scope="col" className="py-3 px-6">DURUM</th>
                        <th scope="col" className="py-3 px-6">İŞLEM</th>
                    </tr>
                    

                </thead>
                <tbody>
                    {/* en son olusturulan siparis en one gelsin: sort kullandim */}
                    {/* createdAt: veritabanında olusturulma tarihi */}
                    {orders.length > 0 &&
                    orders
                    .sort((a,b)=>new Date(b.createdAt) - new Date(a.createdAt))
                    .map((order) => (
                      <tr className="transition-all bg-secondary border-gray-700
                      hover:bg-primary" key={order?._id} >
                          <td className="py-4 px-6 font-medium whitespace-nowrap
                          hover:text-white gap-x-1 ">
                              {order?._id.substring(0,5)}...
                          </td>
                        <td   className="py-4 px-6 font-medium whitespace-nowrap
                        hover:text-white"     >
                          <span>{order?.customer}</span>
                        </td>
                        <td    className="py-4 px-6 font-medium whitespace-nowrap
                        hover:text-white">₺{order?.total}</td>
                        <td    className="py-4 px-6 font-medium whitespace-nowrap
                        hover:text-white">{order?.method === 0 ? "Cash": "Card"}</td>
                        <td    className="py-4 px-6 font-medium whitespace-nowrap
                       hover:text-white"    >{status[order?.status]}</td>
                       
                       
                       <td   className="py-4 px-6 font-medium whitespace-nowrap
                        hover:text-white"     >
                          <button className='btn-primary !bg-success'
                          onClick={()=>handleStatus(order?._id)}
                          disabled={order?.status > 1}
                          >Onayla</button>
                        </td>
                      </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    </div>
  )
}

export default Siparisler
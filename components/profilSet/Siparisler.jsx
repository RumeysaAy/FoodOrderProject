import { useEffect, useState } from 'react'
import Title from '../ui/Title'
import { useSession } from "next-auth/react"
import axios from 'axios'

const Siparisler = () => {

  const [orders, setOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState([]); // su anki kullanici
  const {data: session} = useSession();

  useEffect(() => {
    
    const getOrders  = async () => {
      try{
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders`)
        setOrders(res.data.filter((order) => order.customer === currentUser?.fullName));
        
        } catch (err){
          console.log(err)
        }
      };
      getOrders();
    }, [currentUser]); // hangi deger degistiginde alsin: currentUser
    //session degistiginde burayi tekrar render etsin

    useEffect(() => {
    // email adresinden su anki kullaniciyi bulduk
      const getUsers  = async () => {
        try{
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`)
          setCurrentUser(res.data.filter((user) => user.email === session.user.email)[0]
          )          
          } catch (err){
            console.log(err)
          }
        };
        getUsers();
      }, [session]); // hangi deger degistiginde alsin: session
      //session degistiginde burayi tekrar render etsin

    // console.log(currentUser)


  return (
    <div className="lg:p-4 flex-1 lg:mt-0 mt-5">
        <Title addClass="text-[40px]">Siparişler</Title>

        <div className="overflow-x-auto w-full mt-5">
        <table className="w-full text-sm text-center text-gray-500
            xl:min-w-[1000px] min-w-100%">
                <thead className="text-xs text-gray-400 uppercase
                bg-gray-700">
                    <tr>
                        <th scope="col" className="py-3 px-6">ID</th>
                        <th scope="col" className="py-3 px-6">ADRES</th>
                        <th scope="col" className="py-3 px-6">TARİH</th>
                        <th scope="col" className="py-3 px-6">TOPLAM</th>
                        <th scope="col" className="py-3 px-6">DURUM</th>
                    </tr>
                    
                </thead>
                <tbody>
                    {orders.map((order) => (
                      <tr className="transition-all bg-secondary border-gray-700
                      hover:bg-primary" key={order?._id}>
                          <td className="py-4 px-6 font-medium whitespace-nowrap
                          hover:text-white flex items-center gap-x-2 justify-center">
                              
                          <span>987</span>
                          </td>
                        <td   className="py-4 px-6 font-medium whitespace-nowrap
                        hover:text-white"     >
                          <span>nail bey mah</span>
                        </td>
                        <td    className="py-4 px-6 font-medium whitespace-nowrap
                        hover:text-white"   >01.02.2020</td>
                        <td    className="py-4 px-6 font-medium whitespace-nowrap
                       hover:text-white"    >78₺</td>
                       <td   className="py-4 px-6 font-medium whitespace-nowrap
                        hover:text-white"     >
                          <span>hazırlanıyor</span>
                        </td>
                      </tr>
                    ))}
                </tbody>
            </table>
        </div>


    </div>
  )
}

export default Siparisler
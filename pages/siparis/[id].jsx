import Image from 'next/image'
import axios from 'axios'

const Order = ({order}) => {
    const status = order?.status;
    const statusClass = (index) => {
        if((index - status < 1)) return "";
        if((index - status === 1)) return "animate-pulse";
        if((index - status > 1)) return "";
        
    }

    return (

    <div className='overflow-x-auto'>
        <div className="min-h-[calc(100vh_-_390px)]  
        flex justify-center items-center flex-col p-10
        min-w-[1000px]">
            <div className="flex items-center 
        flex-1 w-full max-h-28">
        <table className="w-full text-sm text-center text-gray-500">
            <thead className="text-xs text-gray-400 uppercase
            bg-gray-700">
                <tr>
                    <th scope="col" className="py-3 px-6">SİPARİŞ ID</th>
                    <th scope="col" className="py-3 px-6">MÜŞTERİ</th>
                    <th scope="col" className="py-3 px-6">ADRES</th>
                    <th scope="col" className="py-3 px-6">TOTAL</th>
                </tr>
                
            </thead>
            <tbody>
                <tr className="transition-all bg-secondary border-gray-700
                hover:bg-primary">
                    <td className="py-4 px-6 font-medium whitespace-nowrap
                    hover:text-white flex items-center gap-x-2 justify-center">
                        {order?._id.substring(0,5)}...
                    </td>
                  <td   className="py-4 px-6 font-medium whitespace-nowrap
                  hover:text-white"     >
                    {order?.customer}
                  </td>
                  <td    className="py-4 px-6 font-medium whitespace-nowrap
                  hover:text-white"   >
                    {order?.adres}
                    </td>
                  <td    className="py-4 px-6 font-medium whitespace-nowrap
                 hover:text-white"    >
                    ₺{order?.total}
                    </td>
                </tr>
            </tbody>
        </table>
            </div>
    
            <div className='flex justify-between w-full
            p-10 bg-primary mt-6'>
                <div className={`relative flex flex-col ${statusClass(0)}`}>
                    <Image src="/images/odeme.png" alt="" width={40} height={40} object-fit="contain"/>
                    <span>Ödeme</span>
                </div>
                <div className={`relative flex flex-col ${statusClass(1)}`}>
                    <Image src="/images/hazirlaniyor.png" alt="" width={40} height={40} object-fit="contain"/>
                    <span>Hazırlanıyor</span>
                </div>
                <div className={`relative flex flex-col ${statusClass(2)}`}>
                    <Image src="/images/getiriliyor.png" alt="" width={40} height={40} object-fit="contain"/>
                    <span>Getiriliyor</span>
                </div>
                <div className={`relative flex flex-col ${statusClass(3)}`}>
                    <Image src="/images/teslim.png" alt="" width={40} height={40} object-fit="contain"/>
                    <span>Teslim Edildi</span>
                </div>

            </div>

        </div>
    </div>    

        



  )
}

export const getServerSideProps = async({params}) => {
    const res =await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${params.id}`
    )

    return{
        props: {
            order: res.data ? res.data : null,
        }
    }
}


export default Order
import Image from "next/image"
import Title from "../../components/ui/Title"
import { useSelector, useDispatch } from "react-redux"
import { reset } from "../../redux/sepet";
import axios from "axios";
import { useSession } from "next-auth/react"
import { toast } from "react-toastify";
import { useRouter } from "next/router";


const Cart = ({userList}) => {
    const {data: session} = useSession()
    const sepet = useSelector((state) => state.sepet);
    const dispatch = useDispatch();
    
    //
    const user = userList?.find((user) => user.email === session?.user?.email)
    // session'nun email'i neyse ve userList'te varsa bu kisinin bilgilerini user 'a at
    const router = useRouter();
    // console.log(user)
    // console.log(session) // giris yapan musterinin email'ini geri donderir
    // session: giris yaptigimizda email ile giris yaptigimizdan sadece email
    // bilgisini verir

    // veritabanindaki user listesini hepsini ceker: userList

    const newOrder = {
        customer: user?.fullName,
        address: user?.adres ? user?.adres : "adres yok",
        total: sepet.total,
        method: 0,

    }

    const createOrder = async () => {
        try{
            if(session){ // giris yapilmissa
                if(confirm("Siparişi Onaylıyor musunuz?")){
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, newOrder)
                    
                    if(response.status === 201){ // 201: api/orders -> POST
                        // order sayfasinin icerisindeki id
                        router.push(`/siparis/${response.data._id}`)

                        dispatch(reset());
                    toast.success("Sipariş Başarıyla Oluşturuldu",{
                        autoClose: 1000,
                    }) // 1 s
                    }
                }
            }else{
                toast.error("Lütfen Giriş Yapınız",{autoClose: 1000})
            }
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <div className="min-h-[calc(100vh_-_390px)]">
        <div className="flex justify-between items-center md:flex-row flex-col">
            <div className="min-h-[calc(100vh_-_390px)] flex items-center p-10
            flex-1 overflow-x-auto w-full">

            <div className="max-h-52 overflow-auto w-full">
            {sepet?.urunler?.length > 0 ? (
                <table className="w-full text-sm text-center text-gray-500
                min-w-[1000px]">
                    <thead className="text-xs text-gray-400 uppercase
                    bg-gray-700">
                        <tr>
                            <th scope="col" className="py-3 px-6">ÜRÜN</th>
                            <th scope="col" className="py-3 px-6">EKSTRALAR</th>
                            <th scope="col" className="py-3 px-6">FİYAT</th>
                            <th scope="col" className="py-3 px-6">ADET</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {sepet.urunler.map((urun, index)=>
                        (
                            <tr className="transition-all bg-secondary border-gray-700
                            hover:bg-primary" key={index}>
                                <td className="py-4 px-6 font-medium whitespace-nowrap
                                hover:text-white flex items-center gap-x-2 justify-center">
                                    <Image src={urun?.img} alt="" 
                              width={50} height={50}/>
                                <span>{urun.name}</span>
                                </td>
                              <td   className="py-4 px-6 font-medium whitespace-nowrap
                              hover:text-white"     >
                                {urun.soslar?.length > 0 ? (
                                    urun.soslar.map
                                    ((item) => (
                                        <span key={item.id}>
                                            {item.text}, 
                                            </span>
                                        )
                                    )
                                    
                                ): "empty"}
                              </td>
                              <td    className="py-4 px-6 font-medium whitespace-nowrap
                              hover:text-white"   >₺{urun.a}</td>
                              <td    className="py-4 px-6 font-medium whitespace-nowrap
                             hover:text-white"    >{urun.adet}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ): <p>Hiç Ürün Yok...</p>}
            </div>

            </div>
            <div  className="bg-secondary min-h-[calc(100vh_-_390px)]
            flex flex-col justify-center text-white p-12 md:w-auto w-full
            md:text-start !text-center">
                <Title addClass="text-[40px]">Sepet Toplam</Title>
                <div className="mt-10">
                    <b>Ara Toplam: </b>{sepet.total}₺ <br/>
                    <b className="my-1 inline-block">İndirim: </b>0.00₺ <br/>
                    <b>Toplam: </b>{sepet.total}₺
                    
                </div>
                <div>
                    <button className="mt-6 btn-primary md:w-auto w-52"
                    onClick={createOrder}>
                        ONAYLA!
                    </button>
                </div>
                
            </div>


        </div>


    </div>
  )
}

// veritabanindaki user listesini hepsini ceker: 
export const getServerSideProps = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);

    return {
        props: {
            userList: res.data ? res.data: [],
        },
    }
}

export default Cart
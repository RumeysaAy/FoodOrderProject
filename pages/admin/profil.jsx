import Image from "next/image";
import { useState } from "react";
import Urunler from "../../components/admin/Urunler";
import Siparisler from "../../components/admin/Siparisler";
import Kategori from "../../components/admin/Kategori";
import Footer from "../../components/admin/Footer";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import AddProduct from "../../components/admin/AddProduct";

const Profil = () => {

    const [tabs, setTabs] = useState(0);
    const [isProductModal, setIsProductModal] = useState(false); // baslangic degerini false yaptik


    const {push} = useRouter();

    const closeAdminAccount = async () => {
        try {
            if(confirm("Hesabınızdan çıkmak istediğinize emin misiniz?")){
                const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin`)
                if(res.status === 200){
                    push("/admin");
                    toast.success("Başarıyla çıkış yapıldı");
                }
            }
        } catch(err){
            console.log(err);
        }
    }

    return (
        <div className='flex px-10 min-h-[calc(100vh_-_390px)] lg:flex-row flex-col
        lg:mb-0 mb-10'>

            <div className="lg:w-60 w-100 flex-shrink-0">
            <div className="relative flex flex-col items-center
            px-10 py-5 border border-b-0">
                <Image 
                src="/images/admin.png" 
                alt=""
                width={100} height={100}
                className="rounded-full"
                />
                <b className="text-2xl mt-1">Admin</b>
            </div>
            <ul className="text-center font-medium">
                <li className=

                {`
                border border-t-0 w-full p-2 cursor-pointer
                hover:bg-primary hover:text-white transition-all
                ${tabs === 0 && "bg-primary text-white"}
                `}

                onClick={() => setTabs(0)}>
                    <i className="fa-solid fa-hotdog"></i>
                    <button className="ml-1">
                        Urunler
                        </button>
                </li>

                <li className=

                    {`
                    border border-t-0 w-full p-2 cursor-pointer
                    hover:bg-primary hover:text-white transition-all
                    ${tabs === 1 && "bg-primary text-white"}
                    `}
                onClick={() => setTabs(1)}>
                    <i className="fa-solid fa-truck-fast"></i>
                    <button className="ml-1">Siparişler</button>
                </li>



                <li className=

                    {`
                    border border-t-0 w-full p-2 cursor-pointer
                    hover:bg-primary hover:text-white transition-all
                    ${tabs === 2 && "bg-primary text-white"}
                    `}
                onClick={() => setTabs(2)}>
                    
                    <i className="fa-solid fa-book-open"></i>
                    <button className="ml-1">Kategoriler</button>
                </li>

                <li className=

                    {`
                    border border-t-0 w-full p-2 cursor-pointer
                    hover:bg-primary hover:text-white transition-all
                    ${tabs === 3 && "bg-primary text-white"}
                    `}
                onClick={() => setTabs(3)}>
                    
                    <i className="fa-solid fa-circle-info"></i>
                    <button className="ml-1">Footer</button>
                </li>
                
                <li className=

                        {`
                        border border-t-0 w-full p-2 cursor-pointer
                        hover:bg-primary hover:text-white transition-all
                        ${tabs === 4 && "bg-primary text-white"}
                        `}
                        onClick={closeAdminAccount}
                        >
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <button className="ml-1">Çıkış</button>
                </li>
            </ul>
                </div>
                {tabs === 0 && (<Urunler />)}
                {tabs === 1 && (<Siparisler />)}
                {tabs === 2 && (<Kategori />)}
                {tabs === 3 && (<Footer />)}
                {isProductModal && (<AddProduct setIsProductModal={setIsProductModal}/>) }
                <button className="btn-primary absolute bottom-14 right-10  w-12 h-12 !p-0
                text-4xl" onClick={()=> setIsProductModal(true)}>+</button>

           

        </div>
    )
}

export const getServerSideProps = (ctx) => {
    // token cookie yok ama admin paneline giris yapiliyor
    // duzeltmek icin
    const myCookie = ctx.req?.cookies || "";
    if(myCookie.token !== process.env.ADMIN_TOKEN){
        // token yoksa
        return{
            redirect:{
                destination: "/admin", // sayfa yuklenmeden bunu admine yonlendir
                permanent: false
            }
        }
    }

    // sayfa yuklenmeden bunu admine yonlendir 
    // sayfa yuklenince
    // client side ise sayfanin yuklenmesini bekleriz
    // server side yaptigimiz icin direkt sayfa yuklenirken
    // istegi attigim gibi o da gidip istek atar
    // eger admin de yoksa hemen gidip o admini yonlendirir

    // giris yapmadan profil sayfasina gitmeye izin vermez
    // giris yaptiktan sonra admin logine izin vermez cikis yapmamız gerekir

    return{
        props:{},
    }
}

export default Profil
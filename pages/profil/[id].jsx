import Image from "next/image";
import { useEffect, useState } from "react";
import Hesap from "../../components/profilSet/Hesap";
import Sifre from "../../components/profilSet/Sifre";
import Siparisler from "../../components/profilSet/Siparisler";
import { getSession, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";

const Profil = ({ user }) => {

    const { data: session } = useSession();
    const [tabs, setTabs] = useState(0);
    const {push} = useRouter()

    const handleSignOut = () => {
        if(confirm("Çıkış yapmak istediğinden emin misin")){
            signOut({redirect: false});
            push("/auth/login")
        }
    }

    useEffect(() => {
        if (!session){
            push("/auth/login")
        }
    }, [session, push])

    return (
        <div className='flex px-10 min-h-[calc(100vh_-_390px)] lg:flex-row flex-col
        lg:mb-0 mb-10'>

            <div className="lg:w-60 w-100 flex-shrink-0">
            <div className="relative flex flex-col items-center
            px-10 py-5 border border-b-0">
                <Image 
                src={user.image ? user.image : "/images/admin.png" }
                alt=""
                width={100} height={100}
                className="rounded-full"
                />
                <b className="text-2xl mt-1">{user.fullName}</b>
            </div>
            <ul className="text-center font-medium">
                <li className=

                {`
                border  w-full p-2 cursor-pointer
                hover:bg-primary hover:text-white transition-all
                ${tabs === 0 && "bg-primary text-white"}
                `}

                onClick={() => setTabs(0)}>
                    <i className="fa-solid fa-house"></i>
                    <button className="ml-1">Hesap</button>
                </li>
                <li className=

                    {`
                    border border-t-0 w-full p-2 cursor-pointer
                    hover:bg-primary hover:text-white transition-all
                    ${tabs === 1 && "bg-primary text-white"}
                    `}
                onClick={() => setTabs(1)}>
                    <i className="fa-solid fa-key"></i>
                    <button className="ml-1">Şifre</button>
                </li>
                <li className=

                    {`
                    border border-t-0 w-full p-2 cursor-pointer
                    hover:bg-primary hover:text-white transition-all
                    ${tabs === 2 && "bg-primary text-white"}
                    `}
                onClick={() => setTabs(2)}>
                    <i className="fa-solid fa-truck-fast"></i>
                    <button className="ml-1">Siparişler</button>
                </li>
                <li className=

                        {`
                        border border-t-0 w-full p-2 cursor-pointer
                        hover:bg-primary hover:text-white transition-all
                        
                        `}
                onClick={handleSignOut}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <button className="ml-1">Çıkış</button>
                </li>
            </ul>
                </div>
                {tabs === 0 && (<Hesap user={user}/>)}
                {tabs === 1 && (<Sifre user={user}/>)}
                {tabs === 2 && (<Siparisler />)}


           

        </div>
    )
}

export async function getServerSideProps({ req, params}){
// id'sine gore cekip islem yapmamiz lazim
  const user = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`)

  return {
    props:{
        user: user ? user.data : null,
    },
  }
}

export default Profil
import { useState } from "react";
import Logo from "../ui/Logo";
import {FaUserAlt, FaShoppingCart, FaSearch} from "react-icons/fa";
import Search from "../ui/Search";
import {GiHamburger} from "react-icons/gi";
import {IoMdCloseCircle} from 'react-icons/io';
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector} from 'react-redux';



const Header = () => {
    const [isSearchModal, setIsSearchModal] = useState(false);
    const [isMenuModal, setIsMenuModal] = useState(false);
    const sepet = useSelector((state) => state.sepet);

    const router = useRouter();

  return (
    // flex ile yan yana yazdirdim
    // justify-between ile aralarına bosluk koydum
    <div className={`h-[5.5rem] z-50 relative w-full ${
        router.asPath === "/" ? "bg-transparent": "bg-secondary !fixed"
        }`}>
        <div className="container mx-auto text-white flex 
        justify-between items-center h-full">
            <Logo />
            <nav className={`sm:static absolute top-0 left-0 
            sm:w-auto sm:h-auto w-full h-screen sm:text-white
            text-black sm:bg-transparent bg-white
            sm:flex hidden z-50
            ${isMenuModal === true && "!grid place-content-center"}`}
            >
                <ul className="flex gap-x-2 sm:flex-row flex-col items-center">
                    <li className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer
                    ${router.asPath === "/" && "text-primary"}`}
                    onClick={() => setIsMenuModal(false)}>
                        <Link href="/">Ana Sayfa</Link>
                    </li>
                    <li className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer
                    ${router.asPath === "/menu" && "text-primary"}`}
                    onClick={() => setIsMenuModal(false)}>
                        <Link href="/menu">Menü</Link>
                    </li>
                    <li className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer
                    ${router.asPath === "/hakkimizda" && "text-primary"}`}
                    onClick={() => setIsMenuModal(false)}>
                        <Link href="/hakkimizda">Hakkımızda</Link>
                    </li>
                    <li className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer
                    ${router.asPath === "/rezervasyon" && "text-primary"}`}
                    onClick={() => setIsMenuModal(false)}>
                        <Link href="/rezervasyon">Rezervasyon</Link>
                    </li>
                </ul>

                {isMenuModal && (
                    <button className='absolute top-4 right-4 z-50' 
                    onClick={()=>setIsMenuModal(false)}>
                        <IoMdCloseCircle 
                        size={25}
                        className='
                        transition-all'/>
            </button>
                )
                }

            </nav>


            <div className="flex gap-x-4 items-center">
                <Link href="/auth/login">
                    <span>
                        <FaUserAlt className={`hover:text-primary 
                        transition-all cursor-pointer
                        ${(router.asPath === "/auth/login" || router.asPath.includes("profil")) && "text-primary"}
                        `}
                        size={18}/>
                    </span>
                    
                </Link>

                <Link href="/cart">
                    <span className="relative">
                        <FaShoppingCart className={`hover:text-primary 
                        transition-all cursor-pointer
                        ${router.asPath === "/cart" && "text-primary"}`}
                        size={18}/>
                        <span className="px-[5px] text-[10px] font-semibold
                        rounded-full bg-primary absolute -top-3 -right-3
                        text-black inline-flex items-center justify-center">
                            {sepet.urunler.length === 0 ? "0" : sepet.urunler.length}
                        </span>
                    </span>
                    
                </Link>
                <button onClick={()=>setIsSearchModal(true)}>
                    <FaSearch className="hover:text-primary 
                    transition-all cursor-pointer"
                    size={18}/>
                </button>
                <a href="#" className="md:inline-block hidden sm">
                    <button className="btn-primary">Çevrimiçi Sipariş Ver</button>
                </a>
                <button className="sm:hidden inline-block" onClick={()=> setIsMenuModal(true)}>
                    <GiHamburger className="text-xl hover:text-primary 
                    transition-all" />
                </button>

            </div>

        </div>

        {isSearchModal && <Search setIsSearchModal={setIsSearchModal}/>}

    </div>
  )
}

export default Header
import Image from "next/image"
import Link from "next/link"
import { FaShoppingCart } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux";
import { urunEkle } from "../../redux/sepet";

// priority
// Doğru olduğunda, görüntü yüksek öncelikli ve ön yüklü kabul edilecektir. 
// kullanarak görüntüler için geç yükleme otomatik olarak devre dışı bırakılır.
const MenuItem = ({product}) => {
    
    // sepetin icerisinde var olan urunun tekrar eklenmesini onledim
    const cart = useSelector((state) =>  state.sepet);
    console.log(cart.urunler) // sepetteki urun sayisi cart->urunler
    const findCart = cart.urunler.find((item) => item._id === product._id)
    // aranan urun findCart a atilir

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(urunEkle({...product, soslar:[{text:"empty"}], a: product.fiyat[0], adet: 1}));
    }

  return (
    <div className="bg-secondary rounded-3xl">
        <div className="w-full bg-[#f1f2f3] h-[210px] grid place-content-center
        rounded-bl-[46px] rounded-tl-2xl rounded-tr-2xl">
            <Link href={`/product/${product._id}`}>
                <div className="relative w-36 h-36 hover:scale-110 transition-all">
                    
                    <Image src={product.img} alt=""
                    fill priority/>
                </div>
            </Link>
        </div>
        <div className="p-[25px] text-white">
            <h4 className="text-xl font-semibold">{product.baslik}</h4>
            <p className="text-[15px]">
            {product.tanitim}
            </p>
            <div className="flex justify-between items-center mt-4">
                <span>₺{product.fiyat[0]}</span>
                {/* sepete eklenen urunun sepet butonu devre disi birakilir: disable*/}
                <button className="btn-primary !w-10 !h-10 !rounded-full !p-0
                grid place-content-center" disabled={findCart}
                onClick={handleClick}
                >
                    <FaShoppingCart/>
                </button>
            </div>
        </div>
    </div>

  )
}

export default MenuItem
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react"
import OutsideClickHandler from "react-outside-click-handler"
import Title from "../ui/Title"
import { GiCancel } from "react-icons/gi"
import axios from "axios"
import { toast } from "react-toastify"

const AddProduct = ({ setIsProductModal }) => {
    const [file, setFile] = useState()
    const [imgSrc, setImgSrc] = useState()

    // yazacagim her yerin state'İni actim
    // her biri için ayri state
    const [baslik, setBaslik] = useState("")
    const [tanitim, setTanitim] = useState("")
    const [kategori, setKategori] = useState("pizza")
    const [fiyat, setFiyat] = useState([])

    const [extra, setExtra] = useState("")
    const [extraOptions, setExtraOptions] = useState([])
    // kategorileri katgoriler'in icerisine attim
    const [katgoriler, setKatgoriler] = useState([])
    // katgoriler'i <select>'in icerisinde saydirdik

    // useEffectle kategorileri cektim
    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/kategoriler`);
                setKatgoriler(res.data);
            } catch (error){
                console.log(error);
            }
        }
        getProducts();
    }, [])

    // console.log(katgoriler);

    // console.log(extraOptions)

    // yazdigim extralari kaydetmek icin:
    const handleExtra = (e) => {
        if(extra){
            if(extra.text && extra.price){
                // yeni degerleri ekleme
                setExtraOptions((prev)=>[...prev, extra])
            }
        }
    }


    // secilen gorseli gormek icin:
    const handleOnChange = (changeEvent) => {
        // dosya yolunu bulmak için: FileReader();
        const reader = new FileReader();
        // yuklendiginde
        reader.onload = function(onLoadEvent){
            setImgSrc(onLoadEvent.target.result);
            setFile(changeEvent.target.files[0])
        };

        reader.readAsDataURL(changeEvent.target.files[0]);
    }

    // fiyatlandirma icin:
    const changePrice = (e, index) => {
        const currentPrices = fiyat;
        currentPrices[index] = e.target.value;
        setFiyat(currentPrices)
    }

    // console.log(file) // file, len

    // data'yi https://cloudinary.com 'a ekledm
    const handleCreate = async () => {
        // from'un içerisindeki bilgilere ulasmak icin
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset","yemeksiparis")

        try {
          const upload_preset = await axios.post("https://api.cloudinary.com/v1_1/db6tl37rj/image/upload", data)
          // url'i aldim
          const { url } = upload_preset.data
          // tum degerleri veritabanina gonderdim
          const newProduct={
            baslik,
            tanitim,
            fiyat,
            kategori: kategori.toLowerCase(),
            img: url, // url, img'in icerisinde
            extraOptions,
          }

          // tum degerleri veritabanina gonderdim
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products`, newProduct)
          
          // islem basariliysa mesaj gonderildi
          if(res.status === 201){
            setIsProductModal(false)
            toast.success("Ürün başarılı bir şekilde oluşturuldu")
          }
          // console.log(url); // http://res.cloudinary.com/db6tl37rj/image/upload/v1672043587/yemeksiparis/stra9wr9ori0a5juqqkr.png
          // gonderilen(post) data'yi icerisindeki bu sekilde alabilirz
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50
    after:content-[''] after:w-screen after:h-screen
    after:bg-white after:absolute after:top-0 after:left-0
    after:opacity-60 grid place-content-center">
        <OutsideClickHandler onOutsideClick={() => setIsProductModal(false)}>
            <div className="w-full h-full grid place-content-center relative">
                <div className="relative z-50 md:w-[600px] w-[370px]
                bg-white border-2 p-10 rounded-3xl">
                    <Title addClass="text-[40px] text-center">Yeni Bir Ürün Ekle</Title>
                    
                    
                    <div className="flex flex-col text-sm mt-6">
                        <label className="flex gap-2 items-center">
                            <input type="file" onChange={handleOnChange} className="hidden"></input>
                            <button className="btn-primary !bg-blue-500 pointer-events-none">Bir Resim Seçin</button>
                            {imgSrc && (
                                <img src={imgSrc} alt="" className="w-24 h-24 rounded-full"></img>
                            )}
                            
                        </label>
                    </div>

                    <div className="flex flex-col text-sm mt-4">
                        <span className="font-semibold mb-[2px]">Başlık</span>
                        <input 
                            type="text" 
                            className="border-2 p-1 h-8 text-sm px-1
                            outline-none" 
                            placeholder="Bir Başlık Yazınız..."
                            onChange={(e) => setBaslik(e.target.value)}>
                        </input>  
                    </div>

                    <div className="flex flex-col text-sm mt-4">
                        <span className="font-semibold mb-[2px]">Tanıtımı</span>
                        <textarea 
                        className="border-2 p-1 h-8 text-sm px-1
                        outline-none" 
                        placeholder="Bir Tanıtım Yazınız..."
                        onChange={(e) => setTanitim(e.target.value)}></textarea>  
                    </div>

                    <div className="flex flex-col text-sm mt-4">
                        <span className="font-semibold mb-[2px]">Kategoriler</span>
                        <select 
                        className="border-2 p-1 h-8 text-sm px-1
                        outline-none" 
                        placeholder="Bir Kategori Seçiniz..."
                        onChange={(e) => setKategori(e.target.value)}
                        >
                            {katgoriler.length > 0 && katgoriler.map((kategori)=> (
                                <option value={kategori.title.toLowerCase()} key={kategori._id}>
                                    {kategori.title}
                                </option>
                            ))}
                            
                            </select>  
                    </div>

                    <div className="flex flex-col text-sm mt-4">
                        <span className="font-semibold mb-[2px]">Fiyatlandırma</span>
                        {kategori === "pizza" ? (

                        
                            <div className="flex justify-between gap-6
                            md:flex-nowrap flex-wrap">
                                <input 
                                    type="number" 
                                    className="border-b-2 p-1 pl-0 text-sm px-1
                                    outline-none" 
                                    placeholder="Küçük..."
                                    onChange={(e) => changePrice(e,0)}>
                                </input>
                                <input 
                                    type="number" 
                                    className="border-b-2 p-1 pl-0 text-sm px-1
                                    outline-none" 
                                    placeholder="Orta..."
                                    onChange={(e) => changePrice(e,1)}>
                                </input>
                                <input 
                                    type="number" 
                                    className="border-b-2 p-1 pl-0 text-sm px-1
                                    outline-none" 
                                    placeholder="Büyük..."
                                    onChange={(e) => changePrice(e,2)}>
                                </input>
                            </div>
                            ): (
                                <input 
                                    type="number" 
                                    className="border-b-2 p-1 pl-0 text-sm px-1
                                    outline-none" 
                                    placeholder="fiyat..."
                                    onChange={(e) => changePrice(e,0)}>
                                </input>
                            )}
                    </div>

                    <div className="flex flex-col text-sm mt-4">
                        <span className="font-semibold mb-[2px]">Ekstralar</span>
                            <div className="flex gap-6
                            md:flex-nowrap flex-wrap">
                                <input 
                                    type="text" 
                                    className="border-b-2 p-1 pl-0 text-sm px-1
                                    outline-none" 
                                    placeholder="Ürün"
                                    name="text"
                                    onChange={(e) => setExtra(
                                        {
                                            ...extra, [e.target.name]:e.target.value
                                        })}>
                                </input>
                                <input 
                                    type="number" 
                                    className="border-b-2 p-1 pl-0 text-sm px-1
                                    outline-none" 
                                    placeholder="Fiyatı"
                                    name="price"
                                    onChange={(e) => setExtra(
                                        {
                                            ...extra, [e.target.name]:e.target.value
                                        })}>
                                </input>
                                <button className="btn-primary ml-auto" onClick={handleExtra}>Ekle</button>
                            </div>
                            <div className="mt-2 flex gap-2 ">
                                {extraOptions.map((item, index) => (
                                    <span className="inline-block border p-1 border-orange-300
                                    rounded-2xl text-xs text-orange-400 cursor-pointer" key={index}
                                    onClick={() => {
                                        setExtraOptions(extraOptions.filter((_, i) => i !==  index));
                                    }}>{item.text}</span>
                                ))}
                                
                            </div>

                    </div>

                    <div className="flex justify-end">
                        <button className="btn-primary !bg-success ml-auto" 
                        onClick={handleCreate}>Oluştur</button>
                    </div>

                    <button
                    className="absolute top-4 right-4"
                    onClick={()=> setIsProductModal(false)}>
                        <GiCancel size={25} className="transition-all"/>
                    </button>

                </div>
            </div>
        </OutsideClickHandler> 
        
    </div>
  )
}

export default AddProduct
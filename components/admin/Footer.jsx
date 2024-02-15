import { useEffect, useState } from 'react';
import Input from "../form/Input";
import Title from "../ui/Title";
import { FooterSchema } from '../../schema/footer';
import { useFormik } from "formik";
import axios from 'axios';
import { toast } from 'react-toastify';

const Footer = () => {
    const [iconName, setIconName] = useState("fa-brands fa-")
    const [linkAddress, setLinkAddress]=useState("https://")
    const [footerData, setFooterData] = useState([])
    const [socialMediaLinks,setSocialMediaLinks] = useState([]);

    
    
    useEffect(() => {

        const getFooterData = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/footer`)
                setFooterData(res.data[0])
                setSocialMediaLinks(res.data[0].socialMedia)
            } catch (err) {
                console.log(err);
            }
        }



        getFooterData();
   

    }, [])

    // console.log(footerData)

    const onSubmit = async(values,actions) => {
        try {
            const res = await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/footer/${footerData._id}`,
                {
                    location: values.konum,
                    email: values.email,
                    phoneNumber: values.phoneNumber,
                    desc: values.aciklama,
                    openingHours: {
                        day: values.day,
                        hour: values.time,
                    },
                    socialMedia: socialMediaLinks,
                    
                }
            );
           if(res.status === 200){
            toast.success("Footer başarıyla güncellendi.")
           }
        } catch (err){
            console.log(err)
        }
    };

    const {values, errors, touched, handleSubmit, handleChange, handleBlur} 
    = useFormik({
        enableReinitialize: true,
        initialValues:{
            konum: footerData?.location,
            email:footerData?.email,
            phoneNumber: footerData?.phoneNumber,
            aciklama:footerData?.desc,
            day:footerData?.openingHours?.day,
            time:footerData?.openingHours?.hour,
            
        },
        onSubmit,
        validationSchema: FooterSchema,
    });

    const inputs=[
        {
            id: 1,
            name: "konum",
            type:"text",
            placeholder: "Konum",
            value: values.konum,
            errorMessage: errors.konum,
            touched: touched.konum,
        },
        
        {
            id: 2,
            name: "email",
            type:"text",
            placeholder: "Mail Adresiniz",
            value: values.email,
            errorMessage: errors.email,
            touched: touched.email,


        },

        {
            id: 3,
            name: "phoneNumber",
            type:"number",
            placeholder: "Telefon Numaranız",
            value: values.phoneNumber,
            errorMessage: errors.phoneNumber,
            touched: touched.phoneNumber,


        },

        {
            id: 4,
            name: "aciklama",
            type:"text",
            placeholder: "Açıklama",
            value: values.aciklama,
            errorMessage: errors.aciklama,
            touched: touched.aciklama,

        },
        {
            id: 5,
            name: "day",
            type:"text",
            placeholder: "Gün",
            value: values.day,
            errorMessage: errors.day,
            touched: touched.day,

        },
        {
            id: 6,
            name: "time",
            type:"text",
            placeholder:"Zaman",
            value: values.time,
            errorMessage: errors.time,
            touched: touched.time,

        },
    ];
  
    const handleCreate = (e) => {
        setSocialMediaLinks(
            [
                ...footerData?.socialMedia,

                {
                    icon: iconName, 
                    link: linkAddress
                }
            ]
        );
        setLinkAddress("https://")
        setIconName("fa-brands fa-")

    }


  return (
    <form className="lg:p-4 flex-1 lg:mt-0 mt-5" onSubmit={handleSubmit}>
                     <Title addClass="text-[40px]">
                         Footer Ayarları
                     </Title>
                     <div className="grid lg:grid-cols-2 grid-cols-1 gap-3 mt-4">
                     {inputs.map((input)=>(
                             <Input 
                             key={input.id} 
                             {...input} 
                             onChange={handleChange}
                             onBlur={handleBlur}
                             />
                         ))}
                     </div>

                     <div className='mt-4 flex justify-between md:items-center
                     md:flex-row flex-col gap-4'>
                        <div className='flex items-center gap-4'>
                            <Input placeholder="Adres Linki"
                            onChange={(e)=> setLinkAddress(e.target.value)}
                            value={linkAddress}
                            />
                            <Input 
                            placeholder= "İcon İsmi" 
                            onChange={(e) => setIconName(e.target.value)} 
                            value={iconName}
                            />
                            <button className='btn-primary' type='button'
                            onClick={handleCreate}
                            >Ekle</button> 
                        </div>
                        <ul className='flex items-center gap-6'>
                            {socialMediaLinks?.map((item, index) => (
                                <li key={index} className="flex items-center">
                            <i className={`${item.icon} text-3xl`}></i>
                                <button className='text-danger'
                                onClick={() => {setIcons((e) => e.filter((i) => i !==icon))}}
                                type="button">
                                <i className="fa-solid fa-trash text-2xl ml-2"></i>
                                </button>
                            </li>
                            ))}
                            
                            
                            
                        </ul>
                     </div>

                    <button className="btn-primary mt-4" type='submit'>
                             Kaydet
                    </button>
                     
                 </form>
  )
}

export default Footer
import React from 'react';
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { profilSchema } from '../../schema/profil';
import { useFormik } from "formik";
import axios from 'axios';
import { toast } from 'react-toastify';

const Hesap = ({ user }) => {

    const onSubmit = async(values,actions) => {
        // update islemi gerceklestirmek icin
        try{
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}`, values);
            if (res.status === 200){
                toast.success("Başarıyla güncellendi.")
            }

        } catch (err) {
            console.log(err);
        }
    };

    const {values, errors, touched, handleSubmit, handleChange, handleBlur} 
    = useFormik({
        // duzenlemede hata almamam icin:
        enableReinitialize: true,
        initialValues:{
            fullName: user?.fullName,
            phoneNumber: user?.phoneNumber,
            email: user?.email,
            adres: user?.adres,
            meslek: user?.meslek,
            bio: user?.bio,
        },
        onSubmit,
        validationSchema: profilSchema,
    });

    const inputs=[
        {
            id: 1,
            name: "fullName",
            type:"text",
            placeholder: "Adınız ve Soyadınız",
            value: values.fullName,
            errorMessage: errors.fullName,
            touched: touched.fullName,
        },
        {
            id: 2,
            name: "phoneNumber",
            type:"number",
            placeholder: "Telefon Numaranız",
            value: values.phoneNumber,
            errorMessage: errors.phoneNumber,
            touched: touched.phoneNumber,


        },
        {
            id: 3,
            name: "email",
            type:"email",
            placeholder: "Mail Adresiniz",
            value: values.email,
            errorMessage: errors.email,
            touched: touched.email,


        },
        {
            id: 4,
            name: "adres",
            type:"text",
            placeholder: "Adres",
            value: values.adres,
            errorMessage: errors.adres,
            touched: touched.adres,

        },
        {
            id: 5,
            name: "meslek",
            type:"text",
            placeholder: "Yaptığınız İş",
            value: values.meslek,
            errorMessage: errors.meslek,
            touched: touched.meslek,

        },
        {
            id: 6,
            name: "bio",
            type:"text",
            placeholder:"Hakkınızda",
            value: values.bio,
            errorMessage: errors.bio,
            touched: touched.bio,

        },
    ];
  


  return (
    <form className="lg:p-4 flex-1 lg:mt-0 mt-5" onSubmit={handleSubmit}>
                     <Title addClass="text-[40px]">
                         Hesap Ayarları
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
                         <button className="btn-primary mt-4"
                         type='submit'>
                             Kaydet
                         </button>
                     
                 </form>
  )
}



export default Hesap
import React from 'react';
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { yeniSfreSchema } from '../../schema/yeniSifre';
import { useFormik } from "formik";
import axios from 'axios';

const Sifre = ({user}) => {

    const onSubmit = async(values,actions) => {
        // update islemi gerceklestirmek icin
        try{
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}`, values)
        actions.resetForm();
        } catch (err) {
            console.log(err);
        }
       
    };

    const {values, errors, touched, handleSubmit, handleChange, handleBlur} 
    = useFormik({
        enableReinitialize: true,
        initialValues:{
            password:'',
            confirmPassword:'',
        },
        onSubmit,
        validationSchema: yeniSfreSchema,
    });

    const inputs=[
        {
            id: 1,
            name: "password",
            type:"password",
            placeholder: "Şifre",
            value: values.password,
            errorMessage: errors.password,
            touched: touched.password,
        },
        {
            id: 2,
            name: "confirmPassword",
            type:"password",
            placeholder: "Şifreyi tekrar giriniz",
            value: values.confirmPassword,
            errorMessage: errors.confirmPassword,
            touched: touched.confirmPassword,


        },
        
    ];
  


  return (
    <form className="lg:p-4 flex-1 lg:mt-0 mt-5" onSubmit={handleSubmit}>
                     <Title addClass="text-[40px]">
                         Şifre
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

export default Sifre
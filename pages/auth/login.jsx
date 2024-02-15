import Title from '../../components/ui/Title'
import Input from '../../components/form/Input'
import { useFormik } from 'formik'
import { loginSchema } from "../../schema/login"
import Link from 'next/link'
import { useSession, signIn, getSession } from "next-auth/react"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const Login = () => {
    const { data: session } = useSession();
    const { push } = useRouter();
    const [suAnkiKullanici, setSuAnkiKullanici] = useState()
    
    const onSubmit = async(values,actions)=>{
        const {email, password}=values
        let options = {redirect:false,email,password }
        try {
            const res = await signIn("credentials",options)
            actions.resetForm();
            
        } catch(err){
            console.log(err);
        }
        
    };

    useEffect(() => {
        const getUser = async()=>{
            try{
                // butun kullanicilari getirdm
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`)
                setSuAnkiKullanici(res.data?.find((user) => user.email === session?.user?.email));
                session && push("/profil/"+suAnkiKullanici?._id)
            }catch(err){
                console.log(err)
            }
        };
        getUser();
        
    }, [session, push, suAnkiKullanici])

// eger giris yapilirsa useEffect ile anlik degisimleri hemen yakalayabiliyorduk
// session degisimini eger null olursa ki ben giriş yaptığımda dolu olması gerekir
// bu direkt yonlendirme yapabilmesi gerekiyor
// [session] -> degisimine gore yapacagiz
// eger session doluysa profile git
    /* useEffect(() => {
        if(session){
            push("/profil");
        }
    }, [session, push])*/
    // getServerSideProps fonksiyonunu kullandigim icin gerek kalmadi

    const{ values, errors, touched, handleSubmit, handleChange, handleBlur }=
        useFormik({
            initialValues:{
                email:"",
                password:"",

            },
            onSubmit,
            validationSchema: loginSchema,
        });

    const inputs = [
        {
            id:1,
            name: "email",
            type: "email",
            placeholder: "Mail Adresiniz",
            value: values.email,
            errorMessage: errors.email,
            touched: touched.email,
        },

        {
            id:2,
            name: "password",
            type: "password",
            placeholder: "Şifre",
            value: values.password,
            errorMessage: errors.password,
            touched: touched.password
            
        }
    ]
        
    

  return (
    <div className='container mx-auto'>
        <form className='flex flex-col items-center my-20 md:w-1/2 w-full mx-auto'
        onSubmit={handleSubmit}>
            <Title addClass="text-[40px] mb-6">Giriş Yap</Title>
            <div className='flex flex-col gap-y-3 w-full'>
                {inputs.map((input) => (
                    <Input
                    key={input.id}
                    {...input}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                ))}
                
            </div>
            <div className='flex flex-col w-full gap-y-3 mt-6'>
            <button className='btn-primary' type='submit'>GİRİŞ YAP</button>

            <button className='btn-primary !bg-secondary' type="button"
            onClick={() => signIn("github")}>
            <i className="fa-brands fa-github mr-2 "></i>GITHUB</button>
            <Link href="/auth/register">
                <span className='text-sm underline cursor-pointer text-gray-400'>Kayıt Ol</span>
            </Link>
            </div>
        </form>
    </div>
  )
}

export async function getServerSideProps({req}){
    const session = await getSession({req})

    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
    // console.log(res.data) // butun kullanicilari geri donderir
    // data'nin icerisinden find ile bul user'i 
    // su anda giris yaptigim session maili ile res.data icerisindeki find'in
    // user mail'i esitse bu data'yi bulacagiz
    const user = res.data?.find((user) => user.email === session?.user.email);
    
  
  // giris yaptiktan sonra profil sayfasini yeniledigimizde login profil
  // olmasini engelledim
    if( session && user ){
      return{
          redirect:{
              destination: "/profil/" + user._id,
              permanent: false
          }
      }
    }
  
    return {
      props: {},
    }
}

export default Login
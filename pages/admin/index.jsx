import Title from '../../components/ui/Title'
import Input from '../../components/form/Input'
import { useFormik } from 'formik'
import { adminSchema } from "../../schema/admin"
import Link from 'next/link'
import axios from 'axios'
import { toast } from "react-toastify"
import { useRouter } from 'next/router'

const Login = () => {
    const {push} = useRouter();
    const onSubmit = async(values,actions)=>{
        try{
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin`,
            values);
            if(res.status === 200){
                //console.log(res.data);
                actions.resetForm();
                toast.success("Giriş Başarılı");
                push("/admin/profil");
            }
        } catch (error){
            console.log(error);
        }
        
    };

    const{ values, errors, touched, handleSubmit, handleChange, handleBlur }=
        useFormik({
            initialValues:{
                username:"",
                password:"",

            },
            onSubmit,
            validationSchema: adminSchema,
        });

    const inputs = [
        {
            id:1,
            name: "username",
            type: "username",
            placeholder: "Kullanıcı Adı",
            value: values.username,
            errorMessage: errors.username,
            touched: touched.username,
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
    <div className='container mx-auto py-4'>
        <form className='flex flex-col items-center my-20 md:w-1/2 w-full mx-auto'
        onSubmit={handleSubmit}>
            <Title addClass="text-[40px] mb-6">Admin Login</Title>
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
            <button className='btn-primary' >GİRİŞ YAP</button>
            
            <Link href="/">
                <span className='text-sm underline cursor-pointer text-gray-400'>Ana Sayfa</span>
            </Link>
            </div>
        </form>
    </div>
  )
}

// client side rendering de once uygulamanin tarayiciya yuklenmesi beklenir
// yuklendikten sonra hangi api'ya istek attiysak sonra atar
// token kismi varken admin login 'e girilmesini engellemek için atar

// get static size props :
// next.js'in bu ozelligi server side rendering yapar
// sayfa yuklenirken api'a istek atar ve sunucu da render edip istegimizi getirir
// ve sayfa yuklendiginde berbaberinde verilerimizi de getirmis oluyo
// sayfaya istek attigimizda beraberinde veriyi de getirsin
// yoksa sayfadaki api istegi yuklendikten sonrada react uygulamasinin yuklendikten sonra
// istek atar

export const getServerSideProps = (ctx) => {
    // req ve post'tan sonra burada cookie islemi varsa burayi alir
    // cookie ye gore giris islemlerini gerceklestirecegiz

    // giris yaptiktan sonra /admin yazsak bile profil acilir
    // cunku girer girmez istek attigi gibi ServerSideProps a gelir ve sayfa daha yuklenmeden
    // atar
    // token cookie yok ama admin paneline giris yapiliyor
    const myCookie = ctx.req?.cookies || "";
    if(myCookie.token === process.env.ADMIN_TOKEN){
        return{
            redirect:{
                destination: "/admin/profil",
                permanent: false
            }
        }
    }

    return{
        props:{},
    }
}

export default Login
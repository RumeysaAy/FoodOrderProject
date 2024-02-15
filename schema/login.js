import * as Yup from "yup";

export const loginSchema = Yup.object({
    email: Yup.string()
    .required("Bu alan boş bırakılamaz")
    .email("Geçersiz e-posta"),

    password: Yup.string()
    .required("Bu alan boş bırakılamaz")
    .min(8,"en az 8 karakter uzunluğunda olmalı")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Şifre en az bir büyük harf, bir küçük harf, bir sayı ve bir özel karakter içermelidir.")
})
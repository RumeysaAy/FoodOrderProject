import * as Yup from "yup";

export const adminSchema = Yup.object({
    username: Yup.string()
    .required("Bu alan boş bırakılamaz")
    .min(3,"en az 3 karakterli olmalı"),

    password: Yup.string()
    .required("Bu alan boş bırakılamaz")
    .min(5,"en az 5 karakter uzunluğunda olmalı")
})
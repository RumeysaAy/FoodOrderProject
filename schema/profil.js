import * as Yup from "yup";

export const profilSchema = Yup.object({
    // alan bos birakilamaz ise required kullanilir
    fullName: Yup.string()
    .required("Bu alan boş bırakılamaz")
    .min(6,"En az 6 karakter uzunluğunda olmalıdır"),

    phoneNumber: Yup.string()
    .required("Bu alan boş bırakılamaz")
    .min(10,"En az 10 karakter uzunluğunda olmalıdır"),

    email: Yup.string()
    .required("Bu alan boş bırakılamaz")
    .email("Geçersiz e-posta"),

    adres: Yup.string()
    .required("Bu alan boş bırakılamaz"),

    meslek: Yup.string()
    .required("Bu alan boş bırakılamaz"),

    bio: Yup.string()
    .required("Bu alan boş bırakılamaz"),


});
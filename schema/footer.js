import * as Yup from "yup";

export const footerSchema = Yup.object({
    // alan bos birakilamaz ise required kullanilir
    konum: Yup.string()
    .required("Bu alan boş bırakılamaz"),
    
    fullName: Yup.string()
    .required("Bu alan boş bırakılamaz")
    .min(6,"En az 6 karakter uzunluğunda olmalıdır"),

    phoneNumber: Yup.string()
    .required("Bu alan boş bırakılamaz")
    .min(10,"En az 10 karakter uzunluğunda olmalıdır"),

    email: Yup.string()
    .required("Bu alan boş bırakılamaz")
    .email("Geçersiz e-posta"),

    aciklama: Yup.string()
    .required("Bu alan boş bırakılamaz"),

    day: Yup.string()
    .required("Bu alan boş bırakılamaz"),

    time: Yup.string()
    .required("Bu alan boş bırakılamaz"),


});
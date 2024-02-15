import * as Yup from "yup";

export const reservationSchema = Yup.object({
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

    persons: Yup.string()
    .required("Bu alan boş bırakılamaz"),

    date: Yup.string()
    .required("Bu alan boş bırakılamaz"),


});
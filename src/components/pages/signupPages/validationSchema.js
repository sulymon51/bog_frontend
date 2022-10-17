import * as Yup from 'yup';

export const privateClientSchema = Yup.object({
    name: Yup.string().required("Full name is required"),
    email: Yup.string().email("Enter a valid E-mail address").required("E-mail Address is required"),
    phone: Yup.string().required("Phone number is required"),
    password: Yup.string().required('Password is required').min(6, "Password should be greater than 6 characters"),
    terms: Yup.boolean().required("Please accept terms and conditions")
})
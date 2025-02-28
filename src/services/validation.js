import * as Yup from 'yup';

export const privateClientSchema = Yup.object({
    fname: Yup.string().required("First name is required"),
    lname: Yup.string().required("Last name is required"),
    email: Yup.string().email("Enter a valid E-mail address").required("E-mail Address is required"),
    phone: Yup.string().required("Phone number is required"),
    password: Yup.string().required('Password is required').matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
    terms: Yup.boolean().required("Please accept terms and conditions")
})

export const loginValidation = Yup.object({
    email: Yup.string().email("Enter a valid E-mail address").required("E-mail Address is required"),
    password: Yup.string().required('Password is required')
})

export const changePasswordValidation = Yup.object({
    password: Yup.string().required('Password is required').matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export const updatePasswordValidation = Yup.object({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string().required('New Password is required').matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
    confirmPassword: Yup.string()
        .required('Please retype your password.')
        .oneOf([Yup.ref('newPassword')], 'Your passwords do not match.'),
});

export const forgetPasswordValidation = Yup.object({
    email: Yup.string().email("Enter a valid E-mail address").required("E-mail Address is required")
})

export const supplierValidationSchema = Yup.object({
    fname: Yup.string().required("First name is required"),
    lname: Yup.string().required("Last name is required"),
    company_name: Yup.string().required("Company name is required"),
    email: Yup.string().email("Enter a valid E-mail address").required("E-mail Address is required"),
    phone: Yup.string().required("Phone number is required"),
    password: Yup.string().required('Password is required').matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
    terms: Yup.boolean().required("Please accept terms and conditions")
})

export const corporateClientSchema = Yup.object({
    name: Yup.string().required("Company name is required"),
    email: Yup.string().email("Enter a valid E-mail address").required("E-mail Address is required"),
    phone: Yup.string().required("Phone number is required"),
    password: Yup.string().required('Password is required').matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
    terms: Yup.boolean().required("Please accept terms and conditions")
});

export const productSchema = Yup.object({
    name: Yup.string().required("Product title is required"),
    quantity: Yup.number().required("Available quantity is required").min(1, "Quantity should be more than 0"),
    price: Yup.number().required("Product title is required").moreThan(0, "Price cannot be 0"),
    unit: Yup.string().required("Product unit of measurement is required"),
    description: Yup.string().required("Product description is required"),
});
export const categorySchema = Yup.object({
    name: Yup.string().required("Product title is required"),
    description: Yup.string().required("Product description is required"),
});
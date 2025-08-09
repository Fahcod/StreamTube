import * as yup from "yup";

// the schema for user signup
export const signupSchema = yup.object().shape({
    fullname:yup.string().required("Fullname is required"),
    username:yup.string().required("Username is required"),
    email:yup.string().email("Please enter a valid email").required("Email is required"),
    password:yup.string().required("Password is required")
})

// the schema for user login
export const loginSchema = yup.object().shape({
    email:yup.string().email("Please enter a valid email").required("Email is required"),
    password:yup.string().required("Password is required")
})
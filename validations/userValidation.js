import { string } from "prop-types";
import * as yup from "yup";

export const loginSchema = yup.object({
  id: yup.string().required("Id is required"),
  password: yup.string().min(8).max(20).required(),
});



export const personalInfoSchema = yup.object({
  email: yup.string().email().required("email is required"),
});
export const changePasswordSchema = yup.object({
  oldPassword: yup
    .string()
    .required("Old password required")
    .min(8, "Incorrect password")
    .max(20, "Incorrect password"),

  newPassword: yup
    .string()
    .required("Enter new password")
    .min(8, "New password must be at least 8 characters")
    .max(20, "New password must be at most 20 characters"),
  confirmPassword: yup
    .string()
    .required("Re enter  your new password")
    .min(8, "New password must be at least 8 characters")
    .max(20, "New password must be at most 20 characters"),
});

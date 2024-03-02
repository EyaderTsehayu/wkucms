import { string } from "prop-types";
import * as yup from "yup";

export const registerStudentSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  middleName: yup.string().required("Middle middle name is required"),
  lastName: yup.string().required("Last name is required"),
  studentId: yup.string().required("Students id is required"),
  collegeName: yup.string().required("College name is required"),
  departmentName: yup.string().required("Department name is required"),
  year: yup.string().required("Year is required"),
  program: yup.string().required("Program is required"),
});

export const registerOfficerSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  middleName: yup.string().required("Middle middle name is required"),
  lastName: yup.string().required("Last name is required"),
  studentId: yup.string().required("Students id is required"),
  // collegeName: yup.string().required("collegeName name is required"),
  
});
export const registerOfficeSchema = yup.object({
  officeName: yup.string().required("Office name is required"),
  officeId: yup.string().required("office id is required"),
});
export const registerAdminSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  middleName: yup.string().required("Middle middle name is required"),
  lastName: yup.string().required("Last name is required"),
  adminId: yup.string().required("Admin id is required"),
  officeName: yup.string().required("Office Name is required"),
});

export const registerStaffSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  middleName: yup.string().required("Middle middle name is required"),
  lastName: yup.string().required("Last name is required"),
  staffId: yup.string().required("Students id is required"),
  // officeName: yup.string().required("Office Name is required"),
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

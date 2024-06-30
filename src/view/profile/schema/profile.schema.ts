import { object, string, boolean, ref } from "yup";

const userChangePasswordSchema = object().shape({
  old_password: string().required("User old password is required."),
  new_password: string().required("User new password is required."),
  confirm_password: string()
    .oneOf([ref("new_password"), ""], "Confirm password must match")
    .required("User confirm password is required."),
});

const userProfileUpdateSchema = object().shape({
  phone: string().required("User phone is required."),
  gender: string().required("User gender is required."),
  address: string().required("User address is required."),
  user_name: string().required("User name is required."),
  bath_date: string().required("User birth date is required."),
  about_you: string().required("User about is required."),
});

export { userChangePasswordSchema, userProfileUpdateSchema };

import { object, string, boolean, ref } from "yup";

const userChangePasswordSchema = object().shape({
  old_password: string()
    .min(8, "Password should at least contain 8 characters.")
    .max(16, "Password should be 16 characters at max.")
    .required("User old password is required."),
  new_password: string()
    .matches(/[a-z]/, "Password should be 1 small character.")
    .matches(/^(?=.*[A-Z])/, "Password should be 1 capital character.")
    .matches(/[1-9]/, "Password should be 1 digit.")
    .matches(
      /^(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
      "Password should be 1 special character.",
    )
    .min(8, "Password should at least contain 8 characters.")
    .max(16, "Password should be 16 characters at max.")
    .required("User new password is required."),
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

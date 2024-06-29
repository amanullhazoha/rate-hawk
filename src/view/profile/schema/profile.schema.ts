import { object, string, boolean, ref } from "yup";

const userChangePasswordSchema = object().shape({
  old_password: string().required("User old password is required."),
  new_password: string().required("User new password is required."),
  confirm_password: string()
    .oneOf([ref("new_password"), ""], "Confirm password must match")
    .required("User confirm password is required."),
});

export { userChangePasswordSchema };

import { object, string, boolean, ref } from "yup";

const resetPasswordSchema = object().shape({
  password: string().required("Password is required."),
  confirmPassword: string()
    .oneOf([ref("password"), ""], "Password must match")
    .required("Confirm password is required."),
});

export { resetPasswordSchema };

import { object, string, boolean, ref } from "yup";

const userSignupSchema = object().shape({
  email: string().required("User email is required."),
  user_name: string().required("User name is required."),
  password: string().required("User password is required."),
  confirmPassword: string()
    .oneOf([ref("password"), ""], "Password must match")
    .required("User password is required."),
  is_agree: boolean()
    .isTrue("User can agree to term and conditions.")
    .required("Is agree required."),
});

export { userSignupSchema };

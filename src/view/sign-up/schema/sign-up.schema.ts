import { object, string, boolean, ref } from "yup";

const userSignupSchema = object().shape({
  email: string().required("User email is required."),
  user_name: string().required("User name is required."),
  password: string()
    .matches(/[a-z]/, "Password should be 1 small character.")
    .matches(/^(?=.*[A-Z])/, "Password should be 1 capital character.")
    .matches(/[1-9]/, "Password should be 1 digit.")
    .matches(
      /^(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
      "Password should be 1 special character.",
    )
    .min(8, "Password should at least contain 8 characters.")
    .max(16, "Password should be 16 characters at max.")
    .required("Password is required."),
  confirmPassword: string()
    .oneOf([ref("password"), ""], "Confirm password must match")
    .required("Confirm password is required."),
  is_agree: boolean()
    .isTrue("User can agree to term and conditions.")
    .required("Is agree required."),
});

export { userSignupSchema };

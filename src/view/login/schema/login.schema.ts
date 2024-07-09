const { object, string, boolean } = require("yup");

const userLoginSchema = object().shape({
  email: string().required("User email is required."),
  password: string()
    .min(8, "Password should at least contain 8 characters.")
    .max(16, "Password should be 16 characters at max.")
    .required("User password is required."),
});

export { userLoginSchema };

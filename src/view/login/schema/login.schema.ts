const { object, string, boolean } = require("yup");

const userLoginSchema = object().shape({
  email: string().required("User email is required."),
  password: string().required("User password is required."),
});

export { userLoginSchema };

export const userInitialState = {
  favorite: [],
  orders: {},
  changed: false,
  profile: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    streetAddress: "",
    addressInfo: "",
    city: "",
    zipCode: "",
    state: "",
  },
};

export const userDataStruct = {
  firstName: { id: "firstName", label: "First Name" },
  lastName: { id: "lastName", label: "Last Name" },
  email: { id: "email", label: "Email", formatCheck: true, type: "email" },
  password: { id: "password", label: "Password" },
  phone: {
    id: "phone",
    label: "Phone number",
    placeholder: "XXX-XXX-XXXX",
    pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
    formatCheck: true,
    type: "tel",
  },
  streetAddress: { id: "streetAddress", label: "Street Address" },
  addressInfo: {
    id: "addressInfo",
    label: "Apt/Ste",
    optional: true,
  },
  city: { id: "city", label: "City" },
  zipCode: {
    id: "zipCode",
    label: "Zip/Postal Code",
    placeholder: "XXXXX",
    formatCheck: true,
  },
  state: { id: "state", label: "State" },
};

export const authStruct = {
  firstName: { id: "firstName", label: "First Name", optional: true },
  lastName: { id: "lastName", label: "Last Name", optional: true },
  email: { id: "email", label: "Email", formatCheck: true, type: "email" },
  password: {
    id: "password",
    label: "Password",
    formatCheck: true,
    type: "password",
  },
  passwordConfirm: {
    id: "passwordConfirm",
    label: "Confirm password",
    formatCheck: true,
    type: "password",
  },
};

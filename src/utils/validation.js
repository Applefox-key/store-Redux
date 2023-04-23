export const isAllValuesFilled = (data, dataStruct) => {
  let errorMsg = "";
  const formFields = Object.keys(data);
  formFields.forEach((element) => {
    if (!dataStruct[element].optional && !data[element])
      errorMsg += `the required field is empty  ${element}  `;
  });
  return [!errorMsg, errorMsg];
};
export const isEmailValid = (value) => {
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  return EMAIL_REGEXP.test(value);
};
function isPhoneValid(value) {
  const regex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  return regex.test(value);
}
function isPasswordValid(value, value2) {
  if (!value || !value2) return true;
  return value === value2;
}
export const isUserDataValid = (field, value, userData = "") => {
  if (!value) return true;
  switch (field) {
    case "email":
      return isEmailValid(value);
    case "phone":
      return isPhoneValid(value);
    case "password":
      return isPasswordValid(value, userData.passwordConfirm);
    case "passwordConfirm":
      return isPasswordValid(value, userData.password);
    default:
      return true;
  }
};
export const formatingUserData = (field, value) => {
  switch (field) {
    case "phone": {
      const cleaned = ("" + value).replace(/\D/g, "").slice(0, 10);
      const regex = /^(\d{0,3})(\d{0,3})(\d{0,4})$/;
      const formatted = cleaned.replace(regex, function (match, p1, p2, p3) {
        let part1 = p1 ? p1 + "-" : "";
        let part2 = p2 ? p2 + "-" : "";
        return part1 + part2 + p3;
      });

      return formatted;
    }
    case "zipCode": {
      const cleaned = ("" + value).replace(/\D/g, "").slice(0, 9);
      const formatted = cleaned.slice(0, 5);
      return formatted;
    }
    default:
      return value;
  }
};

export function required(message) {
  return message || "Обязательное поле";
}

export function validatePassword(value) {
  if (value.length < 8) return "Minimum 8 symbols";
}

export function validateCPassword(password) {
  return function (value) {
    if (value !== password) {
      return "Passwords are not same";
    }
  };
}

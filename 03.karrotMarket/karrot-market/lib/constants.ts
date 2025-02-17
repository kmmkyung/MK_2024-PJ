export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_MAX_LENGTH = 20;
export const USERNAME_REGEX = new RegExp(/^[a-zA-Z0-9가-힣]+$/)
export const PASSWORD_REGEX = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*()\-]).+$/)
export const PASSWORD_REGEX_ERROR = "Must have lowercase, UPPERCASE, a number, special charters"
// The constants store the api name

// for authenticate and related
export const LOGIN_API = '/api/authenticate';
export const SIGN_OUT_API = '/api/sign-out';
export const REFRESH_TOKEN_API = '/api/refresh-token';
// for user and related
export const GET_USER_PROFILE_API ='/api/users?projection={id}';
export const USER_CHANGE_PASSWORD_API ='/api/users/change-password';
export const USER_RESET_PASSWORD_API ='/api/users/reset-password';
export const USER_LIST_API = '/api/users?projection=custom';
export const USER_DETAIL_API = '/api/users/{id}?projection=custom';
export const USER_HISTORY_API = '/api/userHistories?projection=custom&user.id={id}';
export const USER_UPDATE_STATUS_API = '/api/users/update-status';
export const USER_UPDATE_SETTING_API = '/api/users/update-setting';
// for report
export const GET_FILTER_REPORT_API = '/api/transactions?fromDate={fromDate}&toDate={toDate}&g-recaptcha-response={g-recaptcha-response}';
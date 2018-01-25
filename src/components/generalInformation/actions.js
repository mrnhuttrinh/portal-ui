import {
  USER_GENERAL_INFORMATION_API
} from '../../constants';

import {
  GET_USER_GENERAL_INFORMATION
} from './constants';

export const getUserGeneralInformation = () => {
  return {
    // showMessage: {
    //   success: {
    //     title: 'Success!',
    //     message: 'Get user general information success!',
    //   },
    //   error: {
    //     title: 'Error!',
    //     message: 'Get user general information failure!',
    //   },
    // },
    type: GET_USER_GENERAL_INFORMATION,
    fetchConfig: {
      path: USER_GENERAL_INFORMATION_API,
      params: {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    }
  };
};
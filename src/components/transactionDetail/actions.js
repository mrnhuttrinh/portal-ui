import {
  GET_TRANSACTION_DETAIL_API
} from '../../constants';

import {
  GET_TRANSACTION_DETAIL
} from './constants';

export const getTransactionDetail = (id) => {
  const urlGetTransactionDetail = GET_TRANSACTION_DETAIL_API.replace('{id}', id);
  return {
    type: GET_TRANSACTION_DETAIL,
    fetchConfig: {
      path: urlGetTransactionDetail,
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
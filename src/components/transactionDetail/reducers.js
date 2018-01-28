import { Map } from 'immutable';
import {
  GET_TRANSACTION_DETAIL,
} from './constants';

const initialState = new Map({
  transactionDetail: new Map(),
});

export default (state = initialState, action = {}) => {
  let newState;
  const transactionDetail = state.get('transactionDetail');
  switch (action.type) {
    ///////////////////////// refresh token
    case `${GET_TRANSACTION_DETAIL}_START`:
      newState = state.set('transactionDetail', transactionDetail.set('requesting', true)).delete('data').delete('error');
      break;
    case `${GET_TRANSACTION_DETAIL}_COMPLETED`:
      newState = state.set('transactionDetail', transactionDetail.set('requesting', false).set('data', action.data));
      break;
    case `${GET_TRANSACTION_DETAIL}_FAILED`:
      newState = state.set('transactionDetail', transactionDetail.set('requesting', false).set('error', action.error));
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}

import { Map } from 'immutable';
import {
  GET_USER_GENERAL_INFORMATION,
} from './constants';

const initialState = new Map({
  generalInformation: new Map(),
});

export default (state = initialState, action = {}) => {
  let newState;
  const generalInformation = state.get('generalInformation');
  switch (action.type) {
    ///////////////////////// refresh token
    case `${GET_USER_GENERAL_INFORMATION}_START`:
      newState = state.set('generalInformation', generalInformation.set('requesting', true).delete('data').delete('error'));
      break;
    case `${GET_USER_GENERAL_INFORMATION}_COMPLETED`:
      newState = state.set('generalInformation', generalInformation.set('requesting', false).set('data', action.data));
      break;
    case `${GET_USER_GENERAL_INFORMATION}_FAILED`:
      newState = state.set('generalInformation', generalInformation.set('requesting', false).set('error', action.error));
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}

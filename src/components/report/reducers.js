import { Map } from 'immutable';
import {
  FILTERING_REPORT,
} from './constants';

const initialState = new Map({
  filterReport: new Map(),
});

export default (state = initialState, action = {}) => {
  let newState;
  const filterReport = state.get('filterReport');
  switch (action.type) {
    ///////////////////////// refresh token
    case `${FILTERING_REPORT}_START`:
      newState = state.set('filterReport', filterReport.set('requesting', true).delete('data').delete('error'));
      break;
    case `${FILTERING_REPORT}_COMPLETED`:
      newState = state.set('filterReport', filterReport.set('requesting', false).set('data', action.data));
      break;
    case `${FILTERING_REPORT}_FAILED`:
      newState = state.set('filterReport', filterReport.set('requesting', false).set('error', action.error));
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}

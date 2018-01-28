import { Map } from 'immutable';
import {
  FILTERING_REPORT,
  CHANGE_PAGE_DATE,
} from './constants';

const initialState = new Map({
  filterReport: new Map(),
  displayData: new Map({
    currentPage: 0,
    pageSize: 10,
  }),
  transactionDetail: new Map(),
});

export default (state = initialState, action = {}) => {
  let newState;
  const filterReport = state.get('filterReport');
  const displayData = state.get('displayData');
  switch (action.type) {
    ///////////////////////// refresh token
    case `${FILTERING_REPORT}_START`:
      newState = state.set('filterReport', filterReport.set('requesting', true)).set('displayData', displayData.set('currentPage', 0));
      break;
    case `${FILTERING_REPORT}_COMPLETED`:
      newState = state.set('filterReport', filterReport.set('requesting', false).set('data', action.data));
      break;
    case `${FILTERING_REPORT}_FAILED`:
      newState = state.set('filterReport', filterReport.set('requesting', false).set('error', action.error));
      break;
    // change page data
    case CHANGE_PAGE_DATE:
      newState = state.set('displayData', displayData.set('currentPage', action.index));
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}

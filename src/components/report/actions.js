import {
  GET_FILTER_REPORT_API
} from '../../constants';

import {
  FILTERING_REPORT
} from './constants';

export const getFilterReport = (fromDate, toDate, capchaToken) => {
  const urlFilterReport = GET_FILTER_REPORT_API
    .replace('{fromDate}', fromDate)
    .replace('{toDate}', toDate)
    .replace('{g-recaptcha-response}', capchaToken)
  return {
    showMessage: {
      success: {
        title: 'Success!',
        message: 'Get report success!',
      },
      error: {
        title: 'Error!',
        message: 'Get report failure!',
      },
    },
    type: FILTERING_REPORT,
    fetchConfig: {
      path: urlFilterReport,
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
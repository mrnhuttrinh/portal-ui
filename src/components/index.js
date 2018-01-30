import Login, { reducers as loginReducers } from './login';
import NotFound from './notFound';
import GlobalGuide from './globalGuide';
import Report, { reducers as ReportReducers } from './report';
import GeneralInformation, { reducers as GeneralInformationReducer } from './generalInformation';

import UserProfile, { reducers as UserProfileReducers } from './userProfile';
import TransactionDetail, { reducers as TransactionDetailReducer } from './transactionDetail';
// export view
export {
  Login,
  NotFound,
  UserProfile,
  GlobalGuide,
  Report,
  GeneralInformation,
  TransactionDetail,
};

export const reducers = {
  ...loginReducers,
  ...UserProfileReducers,
  ...ReportReducers,
  ...GeneralInformationReducer,
  ...TransactionDetailReducer,
}

// export commons control
export * from './commons';

import Login, { reducers as loginReducers } from './login';
import NotFound from './notFound';
import Dashboard from './dashboard';
import GlobalGuide from './globalGuide';
import Report, { reducers as ReportReducers } from './report';

import UserProfile, { reducers as UserProfileReducers } from './userProfile';

// export view
export {
  Login,
  Dashboard,
  NotFound,
  UserProfile,
  GlobalGuide,
  Report,
};

export const reducers = {
  ...loginReducers,
  ...UserProfileReducers,
  ...ReportReducers,
}

// export commons control
export * from './commons';

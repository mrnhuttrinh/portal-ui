import Login, { reducers as loginReducers } from './login';
import NotFound from './notFound';
import Dashboard from './dashboard';

import UserProfile, { reducers as UserProfileReducers } from './userProfile';

// export view
export {
  Login,
  Dashboard,
  NotFound,
  UserProfile,
};

export const reducers = {
  ...loginReducers,
  ...UserProfileReducers,
}

// export commons control
export * from './commons';

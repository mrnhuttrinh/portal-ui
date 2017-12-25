import Login, { reducers as loginReducers } from './login';
import NotFound from './notFound';
import Dashboard from './dashboard';
// export view
export {
  Login,
  Dashboard,
  NotFound,
};

export const reducers = {
  ...loginReducers,
}

// export commons control
export * from './commons';

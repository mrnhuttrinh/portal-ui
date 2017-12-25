import React from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router
} from 'react-router-dom';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import {
  PrivateRoute,
  PublicRoute,
} from './containers';

import {
  Login,
  NotFound,
  Dashboard,
  UserProfile,
} from './components';

// https://reacttraining.com/react-router/web/example/auth-workflow

const AppRoutes = ({refreshTokenRequesting}) => {
  return (
    <Router>
      <MuiThemeProvider>
        {
          refreshTokenRequesting ? (
            <div className="ecash-app-loading">
              <CircularProgress size={80} thickness={5} />
            </div>
          ) : (
            <Switch>
              <PublicRoute path="/login" component={Login} />
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/user-profile" isExact component={UserProfile} />
              <Route component={NotFound}/>
            </Switch>
          )
        }
      </MuiThemeProvider>
    </Router>
  )
};

const mapStateToProps = (state) => ({
  refreshTokenRequesting: state.loginReducer.get('refreshTokenRequesting'),
});

export default connect(
  mapStateToProps,
)(AppRoutes);

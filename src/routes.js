import React from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router
} from 'react-router-dom';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  PrivateRoute,
  PublicRoute,
} from './containers';

import {
  Login,
  NotFound,
  UserProfile,
  GlobalGuide,
  AnimationGroup,
  GeneralInformation,
  Report,
  TransactionDetail,
} from './components';

// https://reacttraining.com/react-router/web/example/auth-workflow

const AppRoutes = ({refreshTokenRequesting}) => {
  return (
    <Router>
      <MuiThemeProvider>
        <GlobalGuide />
        {
          refreshTokenRequesting ? (
            <div className="ecash-app-loading">
              <AnimationGroup
                loading={true}
                style={{
                  backgroundColor: 'transparent'
                }}
              />
            </div>
          ) : (
            <Switch>
              <PublicRoute path="/login" component={Login} />
              <PrivateRoute exact path="/" component={GeneralInformation} />
              <PrivateRoute exact path="/report" component={Report} />
              <PrivateRoute path="/transaction-detail/:id" component={TransactionDetail} />
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

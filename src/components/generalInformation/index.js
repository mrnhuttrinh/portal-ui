import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';
import _ from 'lodash';
import { ContentWrapper, AnimationGroup } from '../commons';
import GeneralInformationReducer from './reducers';
import Customer from './customer';

import * as actions from './actions';

import './styles.scss';


class GeneralInformation extends React.Component {
  componentDidMount() {
    this.props.actions.getUserGeneralInformation();
  }
  renderCustomer() {
    const {
      generalInformationData: {
        customers
      }
    } = this.props;
    return _.map(customers, (customer, index) => {
      return (
        <Customer data={customer} key={`customer_${index}`} />
      )
    })
  }
  render() {
    return (
      <ContentWrapper appBarDisabled >
        <AnimationGroup
          loading={this.props.generalInformationRequesting}
        />
        {this.renderCustomer()}
      </ContentWrapper>
    );
  }
}

GeneralInformation.defaultProps = {
  generalInformationData: {
    customers: []
  }
};

const mapStateToProps = (state) => {
  const generalInformation = state.GeneralInformationReducer.get('generalInformation');
  return {
    generalInformationRequesting: generalInformation.get('requesting'),
    generalInformationData: generalInformation.get('data'),
    generalInformationError: generalInformation.get('error'),
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Object.assign({}, actions), dispatch)
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(translate('translations')(GeneralInformation)));

export const reducers = {
  GeneralInformationReducer,
};
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';
import _ from 'lodash';
import { Tab } from 'material-ui/Tabs';
import { ContentWrapper } from '../../components';
import { TabTemplate } from '../commons';
import ReportControl from './reportControl';
import ReportReducer from './reducers';
import DataTable, { dataAccesser, TYPE } from '../commons/table';

import { indicatorStyle, tabStyle } from './styles';

class Report extends React.Component {
  static columns = [
    {
      key: 'firstName',
      text: 'First name',
      sort: 'ASC',
    }, {
      key: 'phone',
      text: 'Phone',
    }, {
      key: 'email',
      text: 'EMAIL',
    }
  ];
  renderDataTable() {
    const {
      filterReportData
    } = this.props;
    if (!_.isEmpty(filterReportData) && !_.isEmpty(filterReportData.customerTransactions)) {
      // get account of customer
      return (
        <DataTable
          columns={Report.columns}
          sort={this.props.sort}
          data={this.props.data}
          size={this.props.size}
          style={{
            display: 'block',
          }}
        />
      );
    }
    return (
      <p
        style={{
          margin: '10% auto',
        }}
      >
        {this.props.t('Don\'t have history information!')}
      </p>
    );
  }
  render() {
    return (
      <ContentWrapper
        title="Report"
        iconStyleLeft={{display: 'none'}}
      >
        <TabTemplate
          style={{
            minHeight: 'calc(100% - 56px)',
            height: 'calc(100% - 56px)',
          }}
          inkBarStyle={indicatorStyle}
        >
          <Tab style={tabStyle} label={null} >
            <ReportControl />
            {this.renderDataTable()}
          </Tab>
        </TabTemplate>
      </ContentWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const filterReport = state.ReportReducer.get('filterReport');
  return {
    filterReportRequesting: filterReport.get('requesting'),
    filterReportData: filterReport.get('data'),
    filterReportError: filterReport.get('error'),
  }
};

export default connect(
  mapStateToProps,
)(withRouter(translate('translations')(Report)));

export const reducers = {
  ReportReducer,
};

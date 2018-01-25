import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import { ContentWrapper } from '../../components';
import ReportControl from './reportControl';
import ReportReducer from './reducers';
import ReportData from './reportData';

import './styles.scss';

class Report extends React.Component {
  render() {
    return (
      <ContentWrapper appBarDisabled >
        <div className="portal-user-report">
          <ReportControl />
          <ReportData />
        </div>
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

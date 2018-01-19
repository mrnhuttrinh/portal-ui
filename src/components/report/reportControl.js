import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import Recaptcha from 'react-recaptcha';
import DatePicker from 'material-ui/DatePicker';
import { translate } from 'react-i18next';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';
import { Row, Col } from 'react-flexbox-grid';

import * as actions from './actions';

import { rowContainer } from './styles';

const buttonStyle = {
  margin: '20px',
  backgroundColor: '#009688',
  boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.24)',
}

const recapchaWrapper = {
  height: 78,
  padding: 0,
  margin: 0,
  width: 304,
}

class ReportControl extends React.Component {
  /*eslint-disable no-undef*/
  static siteKey = siteKey;
  /*eslint-enable no-undef*/
  constructor(props) {
    super(props);
    const currentYear = moment().year();
    const currentMonth = moment().month();
    this.state = {
      fromDate: new Date(currentYear, currentMonth, 1),
      toDate: new Date(),
      recaptchaValue: null,
      errors: {},
    }
    this.verifyCallback = this.verifyCallback.bind(this);
    this.onClickViewReport = this.onClickViewReport.bind(this);
  }
  verifyCallback(response) {
    this.setState({
      recaptchaValue: response,
    });
  }
  onClickViewReport() {
    const fromDate = moment(this.state.fromDate).format('M/D/YYYY');
    const toDate = moment(this.state.toDate).format('M/D/YYYY');
    this.props.actions.getFilterReport(fromDate, toDate, this.state.recaptchaValue).then(() => {
      this.setState({
        recaptchaValue: null,
      });
      if (this.recaptchaInstance) {
        this.recaptchaInstance.reset();
      }
    });
  }
  handleChangeDate(key, value) {
    const errors = {};

    if (key === 'fromDate') {
      if (value > this.state.toDate) {
        errors[key] = 'Start date can\'t greater than end date!';
      }
    }
    if (key === 'toDate') {
      if (value < this.state.fromDate) {
        errors[key] = 'End date can\'t less than start date!';
      }
    }
    this.setState({
      [key]: value,
      errors,
    });
  }
  disabledButtonView() {
    if (!this.state.recaptchaValue || this.props.filterReportRequesting){
      return true;
    }
    if (this.state.fromDate || !this.state.toDate) {
      return this.state.toDate < this.state.fromDate;
    }
    return !this.state.fromDate || !this.state.toDate;
  }
  renderControl() {
    return (
      <Row style={rowContainer}>
        <Col md={12}>
          <Row>
            <Col style={{paddingLeft: 10}} md={4} xs={12}>
              <div style={recapchaWrapper}>
                <Recaptcha
                  ref={e => this.recaptchaInstance = e}
                  sitekey={ReportControl.siteKey}
                  verifyCallback={this.verifyCallback}
                />
              </div>
            </Col>
            <Col md={3} xs={12}>
              <DatePicker
                autoOk
                style={{paddingLeft: 20}}
                floatingLabelText={this.props.t('From date')}
                hintText={this.props.t('From date')}
                value={this.state.fromDate}
                onChange={(event, date) => this.handleChangeDate('fromDate', date)}
                fullWidth
                errorText={this.state.errors.fromDate ? this.props.t(this.state.errors.fromDate) : null}
              />
            </Col>
            <Col md={3} xs={12}>
              <DatePicker
                autoOk
                style={{paddingLeft: 20}}
                floatingLabelText={this.props.t('To date')}
                hintText={this.props.t('To date')}
                value={this.state.toDate}
                onChange={(event, date) => this.handleChangeDate('toDate', date)}
                fullWidth
                errorText={this.state.errors.toDate ? this.props.t(this.state.errors.toDate) : null}
              />
            </Col>
            <Col md={2} xs={12}>
              <RaisedButton
                label={this.props.t('View')}
                style={buttonStyle}
                backgroundColor="#009688"
                labelColor="#fff"
                onClick={this.onClickViewReport}
                disabled={this.disabledButtonView()}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
  render() {
    return this.renderControl();
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

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Object.assign({}, actions), dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(translate('translations')(ReportControl)));

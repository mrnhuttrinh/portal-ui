import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import Recaptcha from 'react-recaptcha';
import DatePicker from 'material-ui/DatePicker';
import { translate } from 'react-i18next';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';
import {GridList} from 'material-ui/GridList';
import { Card, CardText } from 'material-ui/Card';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import { getItem } from '../../utils';
import { DEFAULT_LANGUAGE } from '../../constants';

import * as actions from './actions';

const buttonStyle = {
  margin: '10px',
  backgroundColor: '#009688',
  boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.24)',
  float: 'right'
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
      toDate: moment().add(1, 'days').toDate(),
      errors: {},
      popupRecapcha: false,
    }
    this.verifyCallback = this.verifyCallback.bind(this);
    this.onClickViewReport = this.onClickViewReport.bind(this);
  }
  verifyCallback(response) {
    const fromDate = moment(this.state.fromDate).format('M/D/YYYY');
    const toDate = moment(this.state.toDate).format('M/D/YYYY');
    this.props.actions.getFilterReport(fromDate, toDate, response).then(() => {
      this.setState({
        popupRecapcha: false,
      });
    });
  }
  onClickViewReport(event) {
   
    event.preventDefault();

    this.setState({
      popupRecapcha: true,
      anchorEl: event.currentTarget,
    });
  }
  handleRequestClose = () => {
    this.setState({
      popupRecapcha: false,
    });
  };
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
    if (this.props.filterReportRequesting){
      return true;
    }
    if (this.state.fromDate || !this.state.toDate) {
      return this.state.toDate < this.state.fromDate;
    }
    return !this.state.fromDate || !this.state.toDate;
  }
  renderControl() {
    return (
      <Card
        style={{backgroundColor: '#e8e8e8'}}
        containerStyle={{paddingBottom: 0}}
      >
        <CardText
          style={{padding: 5}}
        >
          <GridList
            cols={12}
            padding={5}
            cellHeight={56}
          >
            <DatePicker
              autoOk
              floatingLabelText={this.props.t('From date')}
              hintText={this.props.t('From date')}
              value={this.state.fromDate}
              onChange={(event, date) => this.handleChangeDate('fromDate', date)}
              fullWidth
              errorText={this.state.errors.fromDate ? this.props.t(this.state.errors.fromDate) : null}
              cols={4}
            />
            <DatePicker
              autoOk
              floatingLabelText={this.props.t('To date')}
              hintText={this.props.t('To date')}
              value={this.state.toDate}
              onChange={(event, date) => this.handleChangeDate('toDate', date)}
              fullWidth
              errorText={this.state.errors.toDate ? this.props.t(this.state.errors.toDate) : null}
              cols={4}
            />
            <RaisedButton
              label={this.props.t('View')}
              style={buttonStyle}
              backgroundColor="#009688"
              labelColor="#fff"
              onClick={this.onClickViewReport}
              disabled={this.disabledButtonView()}
              cols={4}
            />
          </GridList>
          <Popover
            open={this.state.popupRecapcha}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'right', vertical: 'center'}}
            targetOrigin={{horizontal: 'right', vertical: 'center'}}
            animation={PopoverAnimationVertical}
          >
            <div>
              <Recaptcha
                hl={getItem('language') || DEFAULT_LANGUAGE}
                ref={e => this.recaptchaInstance = e}
                sitekey={ReportControl.siteKey}
                verifyCallback={this.verifyCallback}
              />
            </div>
          </Popover>
        </CardText>
      </Card>
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

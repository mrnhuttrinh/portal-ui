import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import _ from 'lodash';
import numeral from 'numeral';
import { ContentWrapper, AnimationGroup } from '../commons';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import { Row, Col } from 'react-flexbox-grid';
import { GridList } from 'material-ui/GridList';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import { dateTimeFormatter } from '../../utils';
import * as actions from './actions';
import TransactionDetailReducer from './reducers';

import './styles.scss';

const titleStyle = {
  fontFamily: 'Roboto',
  fontSize: '16px',
  color: '#00897b',
}

class TransactionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.clickOnBackButton = this.clickOnBackButton.bind(this);
  }
  componentDidMount() {
    // get detail
    const {
      match: {
        params: {
          id,
        }
      }
    } = this.props;
    this.props.actions.getTransactionDetail(id);
  }
  clickOnBackButton() {
    this.props.history.push('/report');
  }
  renderBackList () {
    return (
      <MenuItem
        style={{
          color: '#009688',
          letterSpacing: '0px',
          textTransform: 'uppercase',
        }}
        onClick={this.clickOnBackButton}
        leftIcon={
          <FontIcon
            style={{
              color: '#009688',
            }}
            className="material-icons"
          >refresh</FontIcon>}>
          {this.props.t('Back')}
      </MenuItem>
    );
  }
  render() {
    const {
      detailData: {
        card,
        account,
        customer,
        merchant,
        transactionDetail,
        transaction
      }
    } = this.props;
    const address = merchant.address || {};
    const addressCountry = (address.country || '').toUpperCase();
    return (
      <ContentWrapper
        title="Details"
        iconStyleLeft={{display: 'none'}}
        appBarElementRight={this.renderBackList()}
      >
        <Row className="transaction-detail">
          <Col xs={12} sm={6} md={4} lg={4} className="block-detail">
            <Card className="card-detail">
              <CardTitle style={titleStyle}>
                {this.props.t('Account detail')}
              </CardTitle>
              <CardText>
                <GridList
                  cols={12}
                  padding={10}
                  cellHeight={56}
                >
                  <TextField
                    floatingLabelText={this.props.t('Account Name')}
                    value={account.accountName}
                    floatingLabelFixed={true}
                    cols={12}
                    fullWidth
                  />
                  <TextField
                    floatingLabelText={this.props.t('Account Type')}
                    value={account.accountType.description}
                    floatingLabelFixed={true}
                    cols={12}
                    fullWidth
                  />
                  <TextField
                    floatingLabelText={this.props.t('Date Opened')}
                    value={dateTimeFormatter(account.dateOpened)}
                    floatingLabelFixed={true}
                    cols={12}
                    fullWidth
                  />
                  <TextField
                    floatingLabelText={this.props.t('Current Balance')}
                    value={numeral(account.currentBalance).format('0,0.00')}
                    floatingLabelFixed={true}
                    cols={12}
                    fullWidth
                  />
                  <TextField
                    floatingLabelText={this.props.t('Currency Type')}
                    value={account.currencyCode.text}
                    floatingLabelFixed={true}
                    cols={12}
                    fullWidth
                  />
                  <TextField
                    floatingLabelText={this.props.t('Status')}
                    value={this.props.t(account.status)}
                    floatingLabelFixed={true}
                    cols={12}
                    fullWidth
                  />
                </GridList>
              </CardText>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4} lg={4} className="block-detail">
            <Card className="card-detail">
              <CardTitle style={titleStyle}>
                {this.props.t('Card details')}
              </CardTitle>
              <CardText>
                <GridList
                  cols={12}
                  padding={10}
                  cellHeight={56}
                >
                  <TextField
                    floatingLabelText={this.props.t('Card Number')}
                    value={card.cardNumber}
                    floatingLabelFixed={true}
                    cols={12}
                    fullWidth
                  />
                  <TextField
                    floatingLabelText={this.props.t('Card Code')}
                    value={card.cardCode}
                    floatingLabelFixed={true}
                    cols={12}
                    fullWidth
                  />
                  <TextField
                    floatingLabelText={this.props.t('Card Type')}
                    value={card.cardType.description}
                    floatingLabelFixed={true}
                    cols={12}
                    fullWidth
                  />
                  <TextField
                    floatingLabelText={this.props.t('Effective Date')}
                    value={dateTimeFormatter(card.effectiveDate)}
                    floatingLabelFixed={true}
                    cols={12}
                    fullWidth
                  />
                  <TextField
                    floatingLabelText={this.props.t('Status')}
                    value={this.props.t(card.status)}
                    floatingLabelFixed={true}
                    cols={12}
                    fullWidth
                  />
                </GridList>
              </CardText>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={4} lg={4} className="block-detail">
            <Card className="card-detail">
              <CardTitle style={titleStyle}>
                {this.props.t('Merchant details')}
              </CardTitle>
              <CardText>
                <GridList
                  cols={12}
                  padding={10}
                  cellHeight={56}
                >
                  <TextField
                    floatingLabelText={this.props.t('Merchant Name')}
                    value={merchant.name}
                    floatingLabelFixed={true}
                    cols={12}
                    fullWidth
                  />
                  <TextField
                    floatingLabelText={this.props.t('Phone')}
                    value={merchant.phone}
                    floatingLabelFixed={true}
                    cols={12}
                    fullWidth
                  />
                  <TextField
                    floatingLabelText={this.props.t('Email')}
                    value={merchant.email}
                    floatingLabelFixed={true}
                    cols={12}
                    fullWidth
                  />
                  <TextField
                    floatingLabelText={this.props.t('Address')}
                    value={`${address.line1}, ${address.line2}, ${address.city}, ${this.props.t(addressCountry)}`}
                    floatingLabelFixed={true}
                    cols={12}
                    fullWidth
                  />
                  <TextField
                    floatingLabelText={this.props.t('Status')}
                    value={this.props.t(merchant.status)}
                    floatingLabelFixed={true}
                    cols={12}
                    fullWidth
                  />
                </GridList>
              </CardText>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} className="block-detail">
            <Card className="card-detail">
              <CardTitle style={titleStyle}>
                {this.props.t('Transaction details')}
              </CardTitle>
              <CardText>
                <GridList
                  cols={12}
                  padding={10}
                  cellHeight={56}
                >
                  <TextField
                    floatingLabelText={this.props.t('Generation come-up')}
                    value={dateTimeFormatter(transaction.date)}
                    floatingLabelFixed={true}
                    cols={12}
                    fullWidth
                  />
                  <TextField
                    floatingLabelText={this.props.t('Amount')}
                    value={numeral(transaction.amount).format('0,0.00')}
                    floatingLabelFixed={true}
                    cols={12}
                    fullWidth
                  />
                  <TextField
                    floatingLabelText={this.props.t('Note')}
                    value={transactionDetail.detail}
                    floatingLabelFixed={true}
                    cols={12}
                    fullWidth
                  />
                </GridList>
              </CardText>
            </Card>
          </Col>
        </Row>
        <AnimationGroup
          loading={this.props.detailRequesting}
          style={{
            backgroundColor: 'transparent'
          }}
        />
      </ContentWrapper>
    );
  }
}
TransactionDetail.defaultProps = {
  detailData: {
    card: {
      cardType: {}
    },
    account: {
      accountType: {},
      currencyCode: {}
    },
    customer: {},
    merchant: {
      address: {}
    },
    transactionDetail: {},
    transaction: {}
  }
}
const mapStateToProps = (state) => {
  const transactionDetail = state.TransactionDetailReducer.get('transactionDetail');
  return {
    detailData: transactionDetail.get('data'),
    detailRequesting: transactionDetail.get('requesting'),
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Object.assign({}, actions), dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(translate('translations')(TransactionDetail)));

export const reducers = {
  TransactionDetailReducer,
};

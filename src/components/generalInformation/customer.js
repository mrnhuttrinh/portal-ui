import React from 'react';
import { translate } from 'react-i18next';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import { Row, Col } from 'react-flexbox-grid';
import { GridList } from 'material-ui/GridList';
import TextField from 'material-ui/TextField';
import _ from 'lodash';
import { dateFormatter } from '../../utils';
import Account from './account';

const titleStyle = {
  fontFamily: 'Roboto',
  fontSize: '16px',
  color: '#00897b',
}

class Customer extends React.Component {
  renderAccount() {
    const {
      data: {
        accounts
      }
    } = this.props;
    return _.map(accounts, (account, index) => {
      return (
        <Account data={account} key={`account_${index}`} />
      )
    })
  }
  render() {
    const {
      data: {
        customer,
      }
    } = this.props;
    return (
      <Row className="general-information-customer">
        <Col xs={12} sm={6} md={6} lg={4} className="general-information-customer">
          <Card>
            <CardTitle style={titleStyle}>
              {this.props.t('General information')}
            </CardTitle>
            <CardText>
              <GridList
                cols={12}
                padding={10}
                cellHeight={56}
              >
                <TextField
                  floatingLabelText={this.props.t('Last name')}
                  value={customer.lastName}
                  floatingLabelFixed={true}
                  cols={7}
                  fullWidth
                />
                <TextField
                  floatingLabelText={this.props.t('First name')}
                  value={customer.firstName}
                  floatingLabelFixed={true}
                  cols={5}
                  fullWidth
                />
                <TextField
                  floatingLabelText={this.props.t('Date of birth')}
                  value={dateFormatter(customer.dateOfBirth)}
                  floatingLabelFixed={true}
                  cols={7}
                  fullWidth
                />
                <TextField
                  floatingLabelText={this.props.t('Gender')}
                  value={this.props.t(customer.gender ? 'MALE' : 'FEMALE')}
                  floatingLabelFixed={true}
                  cols={5}
                  fullWidth
                />
                <TextField
                  floatingLabelText={this.props.t('Nationality')}
                  value={this.props.t(customer.countryCode ? customer.countryCode.toUpperCase() : '')}
                  floatingLabelFixed={true}
                  cols={12}
                  fullWidth
                />
                <TextField
                  floatingLabelText={this.props.t('Member code')}
                  value={customer.scmsMemberCode}
                  floatingLabelFixed={true}
                  cols={12}
                  fullWidth
                />
                <TextField
                  floatingLabelText={this.props.t('Department')}
                  value={customer.organization ? customer.organization.shortName : ''}
                  floatingLabelFixed={true}
                  cols={7}
                  fullWidth
                />
                <TextField
                  floatingLabelText={this.props.t('Title')}
                  value={this.props.t(customer.position ? customer.position : 'N/A')}
                  floatingLabelFixed={true}
                  cols={5}
                  fullWidth
                />
                <TextField
                  floatingLabelText={this.props.t('Email')}
                  value={this.props.t(customer.email)}
                  floatingLabelFixed={true}
                  cols={12}
                  fullWidth
                />
                <TextField
                  floatingLabelText={this.props.t('Mobile phone')}
                  value={this.props.t(customer.phone1)}
                  floatingLabelFixed={true}
                  cols={6}
                  fullWidth
                />
                <TextField
                  floatingLabelText={this.props.t('Work phone')}
                  value={this.props.t(customer.phone2)}
                  floatingLabelFixed={true}
                  cols={6}
                  fullWidth
                />
              </GridList>
            </CardText>
          </Card>
        </Col>
        {this.renderAccount()}
      </Row>
    );
  }
}

Customer.defaultProps = {
  data: {
    customer: {},
    accounts: []
  }
}

export default translate('translations')(Customer);
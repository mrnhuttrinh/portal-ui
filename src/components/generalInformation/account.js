import React from 'react';
import { translate } from 'react-i18next';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import { GridList } from 'material-ui/GridList';
import { Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import { dateFormatter } from '../../utils';

const titleStyle = {
  fontFamily: 'Roboto',
  fontSize: '16px',
  color: '#00897b',
}

class Account extends React.Component {
  render() {
    const {
      data
    } = this.props;
    return (
      <Col xs={12} sm={6} md={6} lg={4} className="general-information-account">
        <Card>
          <CardTitle style={titleStyle}>
            {this.props.t('Account information')}
          </CardTitle>
          <CardText>
            <GridList
              cols={12}
              padding={10}
              cellHeight={56}
            >
              <TextField
                floatingLabelText={this.props.t('Account No.')}
                value={data.id}
                floatingLabelFixed={true}
                cols={12}
                fullWidth
              />
              <TextField
                floatingLabelText={this.props.t('Type')}
                value={data.accountType ? data.accountType.description : 'N/A'}
                floatingLabelFixed={true}
                cols={6}
                fullWidth
              />
              <TextField
                floatingLabelText={this.props.t('Account name')}
                value={data.accountName}
                floatingLabelFixed={true}
                cols={6}
                fullWidth
              />
              <TextField
                floatingLabelText={this.props.t('Date opened')}
                value={dateFormatter(data.dateOpened)}
                floatingLabelFixed={true}
                cols={6}
                fullWidth
              />
              <TextField
                floatingLabelText={this.props.t('Date closed')}
                value={dateFormatter(data.dateClosed)}
                floatingLabelFixed={true}
                cols={6}
                fullWidth
              />
              <TextField
                floatingLabelText={this.props.t('Currency code')}
                value={data.currencyCode ? data.currencyCode.text : 'N/A'}
                floatingLabelFixed={true}
                cols={6}
                fullWidth
              />
              <TextField
                floatingLabelText={this.props.t('Status')}
                value={this.props.t(data.status)}
                floatingLabelFixed={true}
                cols={6}
                fullWidth
              />

            </GridList>
          </CardText>
        </Card>
      </Col>
    );
  }
}

Account.defaultProps = {
  data: {
    
  }
}

export default translate('translations')(Account);
import React from 'react';
import { translate } from 'react-i18next';
import {Card, CardText} from 'material-ui/Card';

class TransactionDetail extends React.Component {
  render() {
    return (
      <Card>
        <CardText>
          {JSON.stringify(this.props.data)}
        </CardText>
      </Card>
    );
  }
}

export default translate('translations')(TransactionDetail);
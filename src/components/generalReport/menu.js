import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import FontIcon from 'material-ui/FontIcon';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';

import { submenu } from './styles';

class Menu extends React.Component {
  render () {
    return (
      <List style={submenu}>
        <ListItem primaryText={this.props.t('General')} leftIcon={<FontIcon className="material-icons">account_circle</FontIcon>} />
      </List>
    );
  }
}

export default translate('translations')(Menu);
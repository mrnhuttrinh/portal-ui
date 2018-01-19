import React from 'react';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {blue500} from 'material-ui/styles/colors';

const styles = {
  mediumIcon: {
    width: 40,
    height: 40,
    fontSize: 40
  },
  medium: {
    padding: 0,
  },
  spanAbbrevitionName: {
    width: '40px',
    height: '40px',
    fontSize: '22px',
    position: 'absolute',
    left: '5px',
    top: '10px',
    color: blue500,
  }
};


class IconUser extends React.PureComponent {
  getFirstCharOfFirstAndLastWord() {
    const { user } = this.props;
    const firstCharacterOfFirstName = user.firstName ? user.firstName.charAt(0) : '';
    const firstCharacterOfLastName = user.lastName ? user.lastName.charAt(0) : '';
    const combineAbbreviationName = `${firstCharacterOfFirstName}${firstCharacterOfLastName}`;
    return combineAbbreviationName.toUpperCase();
  }
  render() {
    return (
      <IconButton
        iconStyle={styles.mediumIcon}
        style={styles.medium}
      >
        <FontIcon
          className="material-icons"
          color="#e0e0e0"
        >brightness_1</FontIcon>
        <span
          className="abbrevition_name"
          style={{
            width: '40px',
            height: '40px',
            fontSize: '22px',
            position: 'absolute',
            left: '5px',
            top: '10px',
          }}
        >
          {this.getFirstCharOfFirstAndLastWord()}
        </span>
      </IconButton>
    );
  }
}

class DisplayNameUser extends React.PureComponent {
  getDisplayName() {
    const { user } = this.props;
    const firstName = user.firstName ? user.firstName.trim() : '';
    const lastName = user.lastName ? user.lastName.trim() : '';
    return `${firstName} ${lastName}`;
  }
  render() {
    return (
      <div style={{
        display: 'inline-block',
        height: '24px',
        marginLeft: '20px',
        marginRight: '10px',
      }}>
        <span
          style={{
            position: 'relative',
            top: '-10px',
            fontSize: '24px',
          }}>{this.getDisplayName()}</span>
      </div>
    );
  }
}

export {
  IconUser,
  DisplayNameUser
};
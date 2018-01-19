import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import { translate } from 'react-i18next';
import RaisedButton from 'material-ui/RaisedButton';

const indicatorStyle = {
  backgroundColor: '#009688'
};

const divStyles = {
  height: '72px',
  width: '100%',
  backgroundColor: '#e8e8e8',
  boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px,rgba(0, 0, 0, 0.12) 0px 1px 4px',
  display: 'block'
};

const textDateStyle = {
  display: 'block',
  float: 'left',
  paddingTop: '0px',
  paddingLeft: '20px',
}

const buttonStyle = {
  margin: '20px',
  backgroundColor: '#009688',
  boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.24)',
}

class ReportControl extends React.Component {
  render() {
    return (
      <div style={divStyles}>
        <DatePicker
          floatingLabelText={this.props.t('From date')}
          style={textDateStyle}
          hintText={this.props.t('From date')}
          textFieldStyle={{width: '150px',}}
        />
        <DatePicker
          floatingLabelText={this.props.t('To date')}
          style={textDateStyle}
          hintText={this.props.t('To date')}
          textFieldStyle={{width: '150px',}}
        />
        <RaisedButton
          label={this.props.t('View')}
          style={buttonStyle}
          backgroundColor="#009688"
          labelColor="#fff"
        />
      </div>
    );
  }
}

export default translate('translations')(ReportControl);

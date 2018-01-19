import React from 'react';
import PropTypes from 'prop-types';

const containterStyle = {
  height: '100%',
  minHeight: '100%',
};

class ReportWrapper extends React.Component {
  render () {
    const {
      children
    } = this.props;
    return (
      <div style={containterStyle}>
        {children}
      </div>
    );
  }
}

export default ReportWrapper;

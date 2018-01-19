import React from 'react';
import { translate } from 'react-i18next';
import { Row, Col } from 'react-flexbox-grid';
import ReportWrapper from './reportWrapper';
import Menu from './menu';
import Report from './report';

const containterStyle = {
  height: '100%',
  minHeight: '100%',
};

class GeneralReport extends React.Component {
  render() {
    return (
      <ReportWrapper>
        <Row style={containterStyle}>
          <Col md={2} style={containterStyle}>
            <Menu />
          </Col>
          <Col md={10} style={containterStyle}>
            <Report />
          </Col>
        </Row>
      </ReportWrapper>
    );
  }
}

export default translate('translations')(GeneralReport);

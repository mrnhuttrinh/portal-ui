import React from 'react';
import { translate } from 'react-i18next';
import { ContentWrapper, TabTemplate, AnimationGroup } from '../../../components';
import ReportControl from './reportControl';

const indicatorStyle = {
  backgroundColor: '#009688'
};

class Report extends React.Component {
  render() {
    return (
      <ContentWrapper
        title="General reports"
        iconStyleLeft={{display: 'none'}}
        iconStyleRight={{display: 'none'}}
      >
        <div style={{
          minHeight: 'calc(100% - 56px)',
          height: 'calc(100% - 56px)',
          backgroundColor: '#fff',
        }}>
          <ReportControl />
        </div>
      </ContentWrapper>
    );
  }
}

export default translate('translations')(Report);

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import numeral from 'numeral';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import FlatButton from 'material-ui/FlatButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { AnimationGroup, Pagination } from '../';
import { dateTimeFormatter } from '../../utils';
import * as actions from './actions';

import './styles.scss';

class ReportData extends React.Component {
  constructor(props) {
    super(props);
    this.onCellClick = this.onCellClick.bind(this);
    this.pageDataChange = this.pageDataChange.bind(this);
  }
  getData() {
    const { filterReportData:{
      customerTransactions
    } } = this.props;
    if (_.isEmpty(customerTransactions)) {
      return null;
    }
    const { transactions } = customerTransactions[0];
    return _.sortBy(transactions, ['createdAt'], ['desc'])
  }
  onCellClick(indexRow, column, event) {
    const transactions = this.getData();
    // minus 2 row by sum
    if (indexRow > 1) {
      const itemTransaction = transactions[indexRow - 2];
      this.props.history.push(`/transaction-detail/${itemTransaction.id}`);
    }
  }
  getTotalAmount(data) {
    let sumAmount = 0;
    _.each(data, transaction => {
      sumAmount += transaction.amount;
    });
    return sumAmount;
  }
  createRowData() {
    let sumAmount = 0;
    const data = this.getData();
    if (!data || !data.length) {
      return null;
    }
    const startRowData = this.props.currentPage * this.props.pageSize;
    const endRowData = (startRowData + this.props.pageSize) < data.length ? (startRowData + this.props.pageSize) : data.length;
    const dataWillRender = _.slice(data, startRowData, endRowData);
    const dataContent = _.map(dataWillRender, (transaction, index) => {
      sumAmount += transaction.amount;
      return (
        <TableRow key={transaction.id}>
          <TableRowColumn className="header-number-increament">{startRowData + index + 1}</TableRowColumn>
          <TableRowColumn>{dateTimeFormatter(transaction.createdAt)}</TableRowColumn>
          <TableRowColumn>{numeral(transaction.amount).format('0,0.00')}</TableRowColumn>
          <TableRowColumn>{transaction.transactionDetailDetail}</TableRowColumn>
        </TableRow>
      )
    });
    if (!_.isEmpty(dataContent)) {
      dataContent.splice(
        0,
        0,
        <TableRow>
          <TableRowColumn></TableRowColumn>
          <TableRowColumn className="header-number-increament"><b>Sum per page.</b></TableRowColumn>
          <TableRowColumn><b>{numeral(sumAmount).format('0,0.00')}</b></TableRowColumn>
          <TableRowColumn><b>{this.props.t('Total amount of transactions per page')}</b></TableRowColumn>
        </TableRow>
      );
      const totalAllAmount = this.getTotalAmount(data);
      dataContent.splice(
        0,
        0,
        <TableRow>
          <TableRowColumn className="header-number-increament"><b>Sum.</b></TableRowColumn>
          <TableRowColumn></TableRowColumn>
          <TableRowColumn><b>{numeral(totalAllAmount).format('0,0.00')}</b></TableRowColumn>
          <TableRowColumn><b>{this.props.t('Total amount of all transactions')}</b></TableRowColumn>
        </TableRow>
      );
    }
    return dataContent;
  }
  pageDataChange(index) {
    this.props.actions.changePageData(index - 1);
  }
  renderPagination() {
    const data = this.getData();
    if (!data || !data.length) {
      return null;
    }
    const totalPages = Math.ceil(data.length / this.props.pageSize);
    const fromElement = this.props.currentPage * this.props.pageSize + 1;
    const toElement = (fromElement + this.props.pageSize) > data.length ? data.length : (fromElement + this.props.pageSize);
    const totalElements = data.length;
    const pageDescrition = (fromElement === toElement) ? `${fromElement} ${this.props.t('of')} ${totalElements}` : `${fromElement}-${toElement} ${this.props.t('of')} ${totalElements}`;
    return (
      <div style={{backgroundColor: '#fff', padding: '7px', fontSize: '14px', color: 'rgba(0, 0, 0, 0.87)'}}>
        <span style={{float: 'left', lineHeight: '50px'}}>{pageDescrition}</span>
        <div style={{float: 'right', display: 'inline-block', lineHeight: '50px'}}>
          <Pagination
            currentPage={(this.props.currentPage + 1)}
            totalPages={totalPages}
            onChange={this.pageDataChange}
          />
        </div>
        <div style={{clear: 'both'}} />
      </div>
    );
  }

  render() {
    const tableConfig = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: true,
      showRowHover: true,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
    };
    return (
      <div
        className="report-data-list"
        ref={element => this.dataTableWrapper = element}
      >
        <div className="table-report-data">
          <Table
            style={{color: 'rgba(0, 0, 0, 0.87)'}}
            bodyStyle={{
              overflowX: 'visible',
              overflowY: 'visible'
            }}
            fixedHeader={tableConfig.fixedHeader}
            fixedFooter={tableConfig.fixedFooter}
            selectable={tableConfig.selectable}
            multiSelectable={tableConfig.multiSelectable}
            onCellClick={this.onCellClick}
          >
            <TableHeader
              displaySelectAll={tableConfig.showCheckboxes}
              adjustForCheckbox={tableConfig.showCheckboxes}
              enableSelectAll={tableConfig.enableSelectAll}
            >
              <TableRow>
                <TableHeaderColumn
                  className="header-number-increament"
                >
                  <FlatButton
                    label={this.props.t('No.')}
                    labelPosition="before"
                    primary={false}
                    labelStyle={{paddingLeft: 0}}
                  />
                </TableHeaderColumn>
                <TableHeaderColumn>
                  <FlatButton
                    label={this.props.t('Generation come-up')}
                    labelPosition="before"
                    primary={false}
                    labelStyle={{paddingLeft: 0}}
                  />
                </TableHeaderColumn>
                <TableHeaderColumn>
                  <FlatButton
                    label={this.props.t('Amount')}
                    labelPosition="before"
                    primary={false}
                    labelStyle={{paddingLeft: 0}}
                  />
                </TableHeaderColumn>
                <TableHeaderColumn>
                  <FlatButton
                    label={this.props.t('Note')}
                    labelPosition="before"
                    primary={false}
                    labelStyle={{paddingLeft: 0}}
                  />
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={tableConfig.showCheckboxes}
              deselectOnClickaway={tableConfig.deselectOnClickaway}
              showRowHover={tableConfig.showRowHover}
              stripedRows={tableConfig.stripedRows}
            >
              {this.createRowData()}
            </TableBody>
          </Table>
          {this.renderPagination()}
        </div>
        <AnimationGroup
          loading={this.props.filterReportRequesting}
          style={{
            backgroundColor: 'transparent'
          }}
        />
      </div>
    );
  }
}

ReportData.defaultProps = {
  filterReportData: {
    customerTransactions: []
  }
}

const mapStateToProps = (state) => {
  const filterReport = state.ReportReducer.get('filterReport');
  const displayData = state.ReportReducer.get('displayData');
  return {
    filterReportRequesting: filterReport.get('requesting'),
    filterReportData: filterReport.get('data'),
    filterReportError: filterReport.get('error'),
    currentPage: displayData.get('currentPage'),
    pageSize: displayData.get('pageSize'),
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Object.assign({}, actions), dispatch)
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(translate('translations')(ReportData)));
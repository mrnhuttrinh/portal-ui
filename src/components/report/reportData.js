import React from 'react';
import _ from 'lodash';
import numeral from 'numeral';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { AnimationGroup } from '../';
import ReportReducer from './reducers';
import { dateTimeFormatter } from '../../utils';
import TransactionDetail from './transactionDetail';

import './styles.scss';

class ReportData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialogDetail: false,
      transactionsDetail: null,
    };
    this.onCellClick = this.onCellClick.bind(this);
    this.handleCloseDialogDetail = this.handleCloseDialogDetail.bind(this);
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
    // minus 1 row by sum
    if (indexRow !== 0) {
      const itemTransaction = transactions[indexRow - 1];
      this.setState({
        openDialogDetail: true,
        transactionsDetail: itemTransaction,
      });
    }
  }
  createRowData() {
    let sumAmount = 0;
    const dataContent = _.map(this.getData(), (transaction, index) => {
      sumAmount += transaction.amount;
      return (
        <TableRow key={transaction.id}>
          <TableRowColumn>{index + 1}</TableRowColumn>
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
          <TableRowColumn><b>Sum.</b></TableRowColumn>
          <TableRowColumn></TableRowColumn>
          <TableRowColumn><b>{numeral(sumAmount).format('0,0.00')}</b></TableRowColumn>
          <TableRowColumn></TableRowColumn>
        </TableRow>
      );
    }
    return dataContent;
  }
  handleCloseDialogDetail() {
    this.setState({
      openDialogDetail: false,
      transactionsDetail: null,
    });
  }
  createDialogData() {
    const actions = [
      <FlatButton
        label={this.props.t('Cancel')}
        primary={true}
        onClick={this.handleCloseDialogDetail}
      />
    ];
    return (
      <Dialog
        style={{width: '100%', height: '100%'}}
        title={this.props.t('Transaction detail')}
        actions={actions}
        modal={false}
        open={this.state.openDialogDetail}
      >
        <TransactionDetail data={this.state.transactionsDetail} />
      </Dialog>
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
        ref={element => this.dataTableWrapper = element}
        style={Object.assign({}, {
            position: 'relative',
          }, this.props.style
        )}
      >
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
              <TableHeaderColumn>
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
                  label={this.props.t('Content')}
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
        <AnimationGroup
          loading={this.props.filterReportRequesting}
          style={{
            backgroundColor: 'transparent'
          }}
        />
        {this.createDialogData()}
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
  return {
    filterReportRequesting: filterReport.get('requesting'),
    filterReportData: filterReport.get('data'),
    filterReportError: filterReport.get('error'),
  }
};

export default connect(
  mapStateToProps,
)(withRouter(translate('translations')(ReportData)));

export const reducers = {
  ReportReducer,
};

import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { ContentWrapper } from '../../components';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: 20,
      totalPages: 228,
      boundaryPagesRange: 1,
      siblingPagesRange: 1,
      hidePreviousAndNextPageLinks: false,
      hideFirstAndLastPageLinks: true,
      hideEllipsis: false
    };
    this.onPageChangeFromPagination = this.onPageChangeFromPagination.bind(this);
  }
  onPageChangeFromPagination(newPage) {
    this.setState({currentPage: newPage});
  }
  render() {
    return (
      <ContentWrapper
        title="Customer details"
        iconStyleLeft={{display: 'none'}}
      >
        <Table style={{color: 'rgba(0, 0, 0, 0.87)'}}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn style={{paddingRight: '0px'}}>
                <span style={{float: 'left', lineHeight: '58px'}}>TÊN</span>
                <FontIcon style={{float: 'right', lineHeight: '58px'}} className="material-icons">keyboard_arrow_up</FontIcon>
              </TableHeaderColumn>
              <TableHeaderColumn>HỌ</TableHeaderColumn>
              <TableHeaderColumn>NHÓM</TableHeaderColumn>
              <TableHeaderColumn>KHOA | PHÒNG BAN</TableHeaderColumn>
              <TableHeaderColumn>CHỨC VỤ</TableHeaderColumn>
              <TableHeaderColumn>NGÀY KHỞI TẠO</TableHeaderColumn>
              <TableHeaderColumn>TRẠNG THÁI</TableHeaderColumn>
              <TableHeaderColumn style={{width: '30px'}}></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows>
            <TableRow>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn style={{width: '30px'}}><FontIcon className="material-icons">mode_edit</FontIcon></TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>2</TableRowColumn>
              <TableRowColumn>Randal White</TableRowColumn>
              <TableRowColumn>Unemployed</TableRowColumn>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn><FontIcon className="material-icons">mode_edit</FontIcon></TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>3</TableRowColumn>
              <TableRowColumn>Stephanie Sanders</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn><FontIcon className="material-icons">mode_edit</FontIcon></TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>4</TableRowColumn>
              <TableRowColumn>Steve Brown</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn><FontIcon className="material-icons">mode_edit</FontIcon></TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>5</TableRowColumn>
              <TableRowColumn>Christopher Nolan</TableRowColumn>
              <TableRowColumn>Unemployed</TableRowColumn>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn><FontIcon className="material-icons">mode_edit</FontIcon></TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>2</TableRowColumn>
              <TableRowColumn>Randal White</TableRowColumn>
              <TableRowColumn>Unemployed</TableRowColumn>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn><FontIcon className="material-icons">mode_edit</FontIcon></TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>3</TableRowColumn>
              <TableRowColumn>Stephanie Sanders</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn><FontIcon className="material-icons">mode_edit</FontIcon></TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>4</TableRowColumn>
              <TableRowColumn>Steve Brown</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn><FontIcon className="material-icons">mode_edit</FontIcon></TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>5</TableRowColumn>
              <TableRowColumn>Christopher Nolan</TableRowColumn>
              <TableRowColumn>Unemployed</TableRowColumn>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn><FontIcon className="material-icons">mode_edit</FontIcon></TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </ContentWrapper>
    );
  }
}

export default Dashboard;

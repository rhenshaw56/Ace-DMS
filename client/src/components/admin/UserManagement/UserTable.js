import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';
import React, { PropTypes, Component } from 'react';
import SortIcon from 'material-ui/svg-icons/action/swap-vert';
import IconButton from 'material-ui/IconButton';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import styles from './UserTable.scss';
import { sortFunc, processTableData } from '../../../utils';



class UserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAsc: true,
      sortHeader: null,
      offset: 0,
      limit: props.limit,
      page: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      offset: 0,
      sortHeader: null,
      data: nextProps.data,
      page: nextProps.data ? nextProps.data.slice(this.state.offset, nextProps.limit) : [],
    });
    this.paginate = this.paginate.bind(this);
    this.paginateBack = this.paginateBack.bind(this);
    this.paginateForward = this.paginateForward.bind(this);
    this.sortByColumn = this.sortByColumn.bind(this);
  }

  sortByColumn (e) {
    const sortHeader = e.target.id;
    const { data, limit } = this.state;

    const isAsc = this.state.sortHeader === sortHeader ? !this.state.isAsc : true;
    const sortedData = data.sort((a, b) => sortFunc(a, b, sortHeader));

    if (!isAsc) {
      sortedData.reverse();
    }

    this.setState({
      page: sortedData.slice(0, limit),
      data: sortedData,
      sortHeader,
      offset: 0,
      isAsc
    });
    
  }

  paginate(offset, limit) {
    this.setState({
      page: this.state.data.slice(offset, offset + limit),
      offset,
    });
  }

  paginateBack() {
    const { offset, limit } = this.state;
    this.paginate(offset - limit, limit);
  }

  paginateForward() {
    const { offset, limit } = this.state;
    this.paginate(offset + limit, limit);
  }

  render() {
    const { total, tableHeaders } = this.props;
    const { offset, limit, page } = this.state;

    const processedData = processTableData(page);

    return (
      <Table className={ styles.table } selectable={ false }>
        <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
          <TableRow>
            { tableHeaders && tableHeaders.map((header, index) => (
              <TableHeaderColumn key={ index }>
                <div className={ styles.rowAlign }>
                  { header.alias }
                  { header.sortable &&
                    <SortIcon
                      id={ header.dataAlias }
                      className={ styles.sortIcon }
                      onMouseUp={ this.sortByColumn }
                    />
                  }
                </div>
              </TableHeaderColumn>
            )) }
          </TableRow>
        </TableHeader>
        <TableBody showRowHover stripedRows displayRowCheckbox preScanRows>
          {processedData.map((row, index) => (
            <TableRow key={`${index} ${row.id}`}>
              <TableRowColumn key={`${row.id} ${row.id}`}>{row.id}</TableRowColumn>
              <TableRowColumn key={`${row.id} ${row.email}`}>{row.email}</TableRowColumn>
              <TableRowColumn key={`${row.id} ${row.firstName}`}>{row.firstName}</TableRowColumn>
              <TableRowColumn key={`${row.id} ${row.lastName}`}>{row.lastName}</TableRowColumn>
            </TableRow>
            ))
            }
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableRowColumn>
              <div className={ styles.footerControls }>
                { `${Math.min((offset + 1), total)} - ${Math.min((offset + limit), total)} of ${total}` }
                <IconButton
                  disabled={ offset === 0 }
                  onClick={ this.paginateBack }
                >
                  <ChevronLeft />
                </IconButton>
                <IconButton
                  disabled={ offset + limit >= total }
                  onClick={ this.paginateForward }
                >
                  <ChevronRight />
                </IconButton>
              </div>
            </TableRowColumn>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
}

UserTable.propTypes = {
  tableHeaders: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  offset: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired
};

export default UserTable;

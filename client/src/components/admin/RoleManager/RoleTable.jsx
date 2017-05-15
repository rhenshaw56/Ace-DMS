import React, { PropTypes, Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter } from 'material-ui/Table';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SortIcon from 'material-ui/svg-icons/action/swap-vert';
import IconButton from 'material-ui/IconButton';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import FlatButton from 'material-ui/FlatButton';
import { sortFunc, processTableData } from '../../../utils';
import * as roleActions from '../../../actions/roleActions';


/**
 * @class RoleTable
 * @extends {Component}
 */
class RoleTable extends Component {
  /**
   * Creates an instance of RoleTable.
   * @param {any} props
   * @memberOf RoleTable
   */
  constructor(props) {
    super(props);
    this.state = {
      isAsc: true,
      sortHeader: null,
      offset: 0,
      limit: props.limit,
      page: [],
      showButtons: false
    };
    this.paginate = this.paginate.bind(this);
    this.paginateBack = this.paginateBack.bind(this);
    this.paginateForward = this.paginateForward.bind(this);
  }

  /**
   * Hook Method
   * @param {Object} nextProps
   * @returns {none} updates state before component mounts
   * @memberOf RoleTable
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      offset: 0,
      sortHeader: null,
      data: nextProps.data,
      page: nextProps.data ? nextProps.data.slice(this.state.offset, nextProps.limit) : [],
    });
    this.sortByColumn = this.sortByColumn.bind(this);
  }

  /**
   * Function that responds to click events to return sorted data
   * @param {Object} e: browser event
   * @returns {Object} updated state of sorted data
   * @memberOf RoleTable
   */
  sortByColumn(e) {
    const sortHeader = e.target.id;
    const { data, limit } = this.state;
    const isAsc = this.state.sortHeader === sortHeader ?
                                !this.state.isAsc : true;
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
    this.handleSelectedDocument = this.handleSelectedDocument.bind(this);
  }
  handleDelete(id, callback) {
      swal({  //eslint-disable-line
        title: 'Are you sure?',
        text: 'This Role will be totally deleted!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes, delete it!',
        closeOnConfirm: true
      },
    () => {
      callback(id);
    }) .catch(() => {
        swal({ //eslint-disable-line
          title: 'Sorry!',
          text: 'This Role cannot be deleted',
          type: 'warning',
          showConfirmButton: true
        });
    });
  }
  handleEdit(id) {
  }

  /**
   * Function that paginates data in an array
   * @param {Number} offset
   * @param {Number} limit
   *@returns {none} updates state with new paginated data
   * @memberOf RoleTable
   */
  paginate(offset, limit) {
    this.setState({
      page: this.state.data.slice(offset, offset + limit),
      offset,
    });
  }

  /**
   * Functions to move to a previous page
   * @param {none} none
   * @returns {none} none
   * @memberOf RoleTable
   */
  paginateBack() {
    const { offset, limit } = this.state;
    this.paginate(offset - limit, limit);
  }

  /**
   * Functions to move to a new page
   * @param {none} none
   * @returns {none} none
   * @memberOf RoleTable
   */
  paginateForward() {
    const { offset, limit } = this.state;
    this.paginate(offset + limit, limit);
  }

  /**
   * @returns {Object} Jsx
   * @memberOf RoleTable
   */
  render() {
    const { total, tableHeaders } = this.props;
    const { offset, limit, page } = this.state;
    const processedData = processTableData(page);

    return (
      <Table className="table" displaySelectAll={false}>
        <TableHeader adjustForCheckbox>
          <TableRow>
            { tableHeaders && tableHeaders.map((header, index) => (
              <TableHeaderColumn
                key={index}  //eslint-disable-line

              >
                <div className="rowAlign">
                  { header.alias }
                  { header.sortable &&
                    <SortIcon
                      id={header.dataAlias}
                      className="sortIcon"
                      onMouseUp={this.sortByColumn}
                    />
                  }
                </div>
              </TableHeaderColumn>
            )) }
          </TableRow>
        </TableHeader>
        <TableBody
          stripedRows
        >
          {processedData.map((row, index) => (
            <TableRow
              key={`${index} ${row.id}`} //eslint-disable-line
            >
              <TableRowColumn
                key={`${row.id} ${row.id}`}

              >{row.id}</TableRowColumn>
              <TableRowColumn
                key={`${row.id} ${row.title}`}

              >{row.title}</TableRowColumn>
              <TableRowColumn
                key={`${row.id} ${row.access}`}

              >{row.access}</TableRowColumn>

              <TableRowColumn
                key={`${row.id} ${row.ownerRoleId}`}
              ><FlatButton
                key={`${index}flat${row.id}`}
                label="Delete"
                secondary
                onTouchTap={
                () => {
                  this.handleDelete(row.id, this.props.actions.deleteRole);
                }
              }
              /></TableRowColumn>
              <TableRowColumn
                key={`${row.id} ${row.ownerRoleId}`}
              ><FlatButton
                key={`${index}flat${row.id}`}
                label="Edit"
                secondary
                onTouchTap={
                () => {
                  this.handleEdit(row.id);
                }
              }
              /></TableRowColumn>
            </TableRow>
            ))
            }
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableRowColumn>
              <div
                className="footerControls"
              >
                { `${Math.min((offset + 1), total)} - ${Math.min((offset + limit), total)} of ${total}` }
                <IconButton
                  disabled={offset === 0}
                  onClick={this.paginateBack}
                >
                  <ChevronLeft />
                </IconButton>
                <IconButton
                  disabled={offset + limit >= total}
                  onClick={this.paginateForward}
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

RoleTable.propTypes = {
  tableHeaders: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,                                   //eslint-disable-line
  offset: PropTypes.number.isRequired,                                 //eslint-disable-line
  total: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  actions: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(roleActions, dispatch)
});

export default connect(null, mapDispatchToProps)(RoleTable);

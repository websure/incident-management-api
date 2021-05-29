/**
 * Smart table
 * Display incident list in table
 * Allows API sorting, lazy loading
 * Handle loading,error and Empty table data
 * click on row to show details page
 *
 */
import React, { useEffect, useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { Table, Visibility } from 'semantic-ui-react';
import IncidentApi from './Api';
import useAsync from '../common/hoc/useAsync';
import { STATUS_COLOR } from './constants';
import Loader from '../common/Loader';
import useTableReload from '../common/hoc/useTableReload';

const TABLE_SORT_ICON = {
  asc: 'ascending',
  desc: 'descending',
};

const IncidentTable = ({ history }) => {
  const DefaultProps = {
    max: 5,
    start_index: 0,
    filterby: [],
    sortby: 'created_on',
    orderby: 'desc',
  };

  const TableRef = useRef(null);
  const { reloadTable } = useTableReload();
  const { fetch, loading, data, reset, error } = useAsync();
  const [apiFilter, setApiFilter] = useState(DefaultProps);
  const [apiTriggered, setApiTriggered] = useState(false);
  const [tableData, setTableData] = useState({});
  const [sorting, setSorting] = useState({ direction: null, column: null });

  /**
   * Construct table data
   */
  const constructTableData = (list = [], newFetch = false) => {
    const { data: previousData = [] } = tableData;
    const tblData = newFetch ? list : [...previousData, ...list];
    setTableData({
      data: tblData,
    });
  };
  /**
   * Process params and fetch Data for table.
   */
  const fetchTableData = (newFilter = {}, newFetch = false) => {
    const params = {
      ...DefaultProps,
      ...newFilter,
    };
    if (!apiTriggered) {
      fetch(
        IncidentApi.getIncidentList(params)
          .then((res) => {
            constructTableData(res, newFetch);
          })
          .then(() => setApiTriggered(false)),
      );
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  useEffect(() => {
    fetchTableData({}, true);
  }, [reloadTable]);

  const setFilter = (sortby) => {
    const { direction } = sorting;
    const orderby = direction === 'asc' ? 'desc' : 'asc';
    setSorting({ column: sortby, direction: orderby });
    fetchTableData({ sortby, orderby }, true);
  };
  /**
   * handle lazy loading
   */
  const handleUpdate = (e, { calculations }) => {
    const { direction, bottomVisible, topVisible } = calculations;
    if (
      direction === 'down' &&
      !topVisible &&
      bottomVisible &&
      !loading &&
      !error
    ) {
      fetchTableData({
        start_index: tableData.data.length,
      });
    }
  };

  const showTableRows = () =>
    tableData?.data?.map(
      (
        { type, status, id, title, created_by: createdBy, assignee, ...rest },
        index,
      ) => (
        <Table.Row
          key={id}
          id={id}
          ref={TableRef}
          onClick={(e) => history.push(`/incident/${e.target.parentNode.id}`)}
        >
          <Table.Cell>{type.toUpperCase()}</Table.Cell>
          <Table.Cell
            style={{
              color: STATUS_COLOR[status.toUpperCase()],
            }}
          >
            {status.toUpperCase()}
          </Table.Cell>
          <Table.Cell
            style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
            title={title}
          >
            <span>{title}</span>
          </Table.Cell>
          <Table.Cell>{createdBy}</Table.Cell>
          <Table.Cell>{assignee}</Table.Cell>
        </Table.Row>
      ),
    );
  return (
    <Visibility fireOnMount onUpdate={handleUpdate}>
      <Table sortable celled fixed selectable ref={TableRef}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={
                sorting.column === 'type'
                  ? TABLE_SORT_ICON[sorting.direction]
                  : null
              }
              onClick={() => setFilter('type')}
            >
              Type
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                sorting.column === 'status'
                  ? TABLE_SORT_ICON[sorting.direction]
                  : null
              }
              onClick={() => setFilter('status')}
            >
              Status
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                sorting.column === 'title'
                  ? TABLE_SORT_ICON[sorting.direction]
                  : null
              }
              onClick={() => setFilter('title')}
            >
              Title
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                sorting.column === 'created_by'
                  ? TABLE_SORT_ICON[sorting.direction]
                  : null
              }
              onClick={() => setFilter('created_by')}
            >
              Created By
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                sorting.column === 'assignee'
                  ? TABLE_SORT_ICON[sorting.direction]
                  : null
              }
              onClick={() => setFilter('assignee')}
            >
              Assignee
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{!loading && !error && showTableRows()}</Table.Body>
      </Table>
      {loading && <Loader />}
      {error && <span>Error in fetching Incident List</span>}
      {!loading &&
        !error &&
        (!tableData.data || tableData?.data?.length === 0) && (
          <h5> No data found</h5>
        )}
    </Visibility>
  );
};

export default withRouter(IncidentTable);

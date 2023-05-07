import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import moment from 'moment';
import Table from '@mui/material/Table';
import { ButtonBase } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import TableContainer from '@mui/material/TableContainer';
import TableSortLabel from '@mui/material/TableSortLabel';
import './TablesComponent.scss';

export const getDataFromObject = (dataItem, key, isReturnAsIs) => {
  if (!key)
    return (typeof dataItem !== 'object' && (isReturnAsIs ? dataItem : `${dataItem}`)) || '';
  if (!key.includes('.'))
    return (dataItem[key] !== null && (isReturnAsIs ? dataItem[key] : `${dataItem[key]}`)) || '';
  let a = dataItem;
  key.split('.').map((item) => {
    if (a) a = a[item];
    return item;
  });
  return a;
};

export const TablesComponent = memo(
  ({
    data,
    isOdd,
    pageSize,
    isLoading,
    pageIndex,
    tableExRef,
    bodyRowRef,
    dateFormat,
    headerData,
    footerData,
    totalItems,
    disabledRow,
    isResizable,
    tableOptions,
    headerRowRef,
    tableActions,
    selectedRows,
    uniqueKeyInput,
    onActionClicked,
    paginationIdRef,
    tableActionText,
    getIsSelectedRow,
    isDisabledActions,
    sortColumnClicked,
    onPageSizeChanged,
    onTableRowClicked,
    onPageIndexChanged,
    isWithTableActions,
    tableActionsOptions,
    isOriginalPagination,
    onHeaderColumnsReorder,
    tableRowValidationArray,
    onSelectedRowsCountChanged,
  }) => {
    const tableRef = useRef(null);
    const [, setActiveItem] = useState(null);
    const startResizePointRef = useRef(null);
    const currentResizingColumnRef = useRef(null);
    const [focusedRow, setFocusedRow] = useState(-1);
    const [currentOrderById, setCurrentOrderById] = useState(-1);
    const [reorderedHeader, setReorderedHeader] = useState(null);
    const [localSelectedRows, setLocalSelectedRows] = useState([]);
    const [currentDragOverIndex, setCurrentDragOverIndex] = useState(null);
    const [currentDraggingColumn, setCurrentDraggingColumn] = useState(null);
    const [currentOrderDirection, setCurrentOrderDirection] = useState('desc');

    const descendingComparator = (a, b, orderBy) => {
      if (b[orderBy] < a[orderBy]) return -1;
      if (b[orderBy] > a[orderBy]) return 1;

      return 0;
    };
    const getComparator = (order, orderBy) =>
      order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
    const createSortHandler = useCallback(
      (columnId) => () => {
        if (!tableOptions) return;
        setCurrentOrderDirection((item) => (item === 'desc' ? 'asc' : 'desc'));
        setCurrentOrderById(columnId);
        if (tableOptions.sortFrom === 2) sortColumnClicked(columnId, currentOrderDirection);
      },
      [currentOrderDirection, tableOptions, sortColumnClicked],
    );
    const stableSort = (array, comparator) => {
      const stabilizedThis = array.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;

        return a[1] - b[1];
      });

      return stabilizedThis.map((el) => el[0]);
    };
    const getCurrentSelectedItemIndex = useCallback(
      (row) =>
        localSelectedRows.findIndex(
          (item) =>
            getDataFromObject(row, uniqueKeyInput) === getDataFromObject(item, uniqueKeyInput),
        ),
      [localSelectedRows, uniqueKeyInput],
    );

    const bodyRowClicked = useCallback((rowIndex, item) => {
      setActiveItem(item);
    }, []);

    const getSortDataName = () => {
      const currentHeader = (reorderedHeader || headerData).find(
        (item) => item.id === currentOrderById,
      );
      if (currentHeader) return currentHeader.input;

      return null;
    };

    const onDragColumnHandler = useCallback(
      (index) => (event) => {
        event.dataTransfer.setData('text', event.currentTarget.id);
        setCurrentDraggingColumn(index);
      },
      [],
    );

    const onDragEndColumnHandler = useCallback(() => {
      if (currentDragOverIndex !== null) setCurrentDragOverIndex(null);
    }, [currentDragOverIndex]);

    const onDragOverColumnHandler = useCallback(
      (index) => (event) => {
        event.preventDefault();
        if (currentDragOverIndex !== index) setCurrentDragOverIndex(index);
      },
      [currentDragOverIndex],
    );

    const onDropColumnHandler = useCallback(
      (index) => (event) => {
        event.preventDefault();
        if (!currentDraggingColumn && currentDraggingColumn !== 0) return;

        const localColumns = [...(reorderedHeader || headerData)];
        localColumns.splice(index, 0, localColumns.splice(currentDraggingColumn, 1)[0]);
        if (onHeaderColumnsReorder) onHeaderColumnsReorder(localColumns);
        else setReorderedHeader(localColumns);
      },
      [currentDraggingColumn, headerData, onHeaderColumnsReorder, reorderedHeader],
    );

    const onResizeDownHandler = useCallback(
      (idRef) => (event) => {
        event.preventDefault();
        if (!idRef) return;
        currentResizingColumnRef.current = document.querySelector(idRef);
        startResizePointRef.current = currentResizingColumnRef.current.offsetWidth - event.pageX;
      },
      [],
    );

    const onActionClickedHandler = useCallback(
      (row, rowIndex) => (event) => {
        if (onActionClicked) onActionClicked(row, rowIndex, event);
      },
      [onActionClicked],
    );

    const onTableRowClickedHandler = useCallback(
      (row) => {
        if (onTableRowClicked) onTableRowClicked(row);
      },
      [onTableRowClicked],
    );

    useEffect(() => {
      if ((selectedRows || localSelectedRows) && onSelectedRowsCountChanged)
        onSelectedRowsCountChanged((selectedRows || localSelectedRows).length);
    }, [localSelectedRows, onSelectedRowsCountChanged, selectedRows]);

    useEffect(() => {
      if (selectedRows) setLocalSelectedRows(selectedRows);
    }, [selectedRows]);

    return (
      <div className='w-100 table-responsive' ref={tableRef}>
        <TableContainer ref={tableExRef}>
          <Table
            className='table-wrapper'
            aria-labelledby='tableTitle'
            size='medium' // 'small' or 'medium'
            aria-label='enhanced table'
          >
            <TableHead>
              <TableRow>
                {(reorderedHeader || headerData)
                  .filter((column) => !column.isHidden)
                  .map((item, index) => (
                    <TableCell
                      key={`${headerRowRef}${index + 1}`}
                      className={`${(index === currentDragOverIndex && 'drag-over-cell') || ''}`}
                      draggable={item.isDraggable}
                      onDragOver={onDragOverColumnHandler(index)}
                      onDragEnd={onDragEndColumnHandler}
                      onDrag={onDragColumnHandler(index)}
                      onDrop={onDropColumnHandler(index)}
                      id={`${index + 1}-head-item`}
                    >
                      {item.isSortable ? (
                        <TableSortLabel
                          IconComponent={() => <span className='mdi mdi-menu-swap c-gray' />}
                          active={currentOrderById === item.id}
                          direction={currentOrderById === item.id ? currentOrderDirection : 'desc'}
                          onClick={createSortHandler(item.id)}
                        >
                          {(item.headerComponent && item.headerComponent(item, index)) ||
                            item.label}
                        </TableSortLabel>
                      ) : (
                        (item.headerComponent && item.headerComponent(item, index)) || item.label
                      )}
                      {(item.isResizable || isResizable) && (
                        <ButtonBase
                          className='resize-btn'
                          onMouseDown={onResizeDownHandler(`#${headerRowRef}${index + 1}`)}
                        >
                          <span />
                        </ButtonBase>
                      )}
                    </TableCell>
                  ))}
                {isWithTableActions && tableActionsOptions && (
                  <TableCell id={`tableActionsOptionsRef`} className='actions-cells'>
                    <div className='actions-cell'>
                      <div className='actions-cell-item'>{tableActionText}</div>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            {!isLoading && (
              <TableBody className={`${isOdd ? 'is-odd' : ''}`}>
                {stableSort(data, getComparator(currentOrderDirection, getSortDataName())).map(
                  (row, rowIndex) => {
                    const isItemSelected = getCurrentSelectedItemIndex(row) !== -1;

                    return (
                      <React.Fragment key={`bodyRow${rowIndex * (pageIndex + 1)}`}>
                        <TableRow
                          role='checkbox'
                          aria-checked={
                            (getIsSelectedRow && getIsSelectedRow(row, rowIndex)) || isItemSelected
                          }
                          tabIndex={-1}
                          selected={
                            (getIsSelectedRow && getIsSelectedRow(row, rowIndex)) || isItemSelected
                          }
                          id={`body-row-${rowIndex * (pageIndex + 1)}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            bodyRowClicked(rowIndex, row);
                            onTableRowClickedHandler(row);
                          }}
                          className={`${rowIndex === focusedRow ? 'table-row-overlay' : ''} ${
                            disabledRow && disabledRow(row) ? 'is-disabled' : ''
                          }`}
                        >
                          {headerData.length > 0 &&
                            (reorderedHeader || headerData)
                              .filter((column) => !column.isHidden)
                              .map((column, columnIndex) => (
                                <TableCell
                                  key={`bodyColumn${columnIndex * (pageIndex + 1) + rowIndex}`}
                                  className={column.cellClasses || ''}
                                >
                                  {(column.isDate &&
                                    ((getDataFromObject(row, column.input) &&
                                      moment(getDataFromObject(row, column.input)).format(
                                        column.dateFormat || tableOptions.dateFormat || dateFormat,
                                      )) ||
                                      '')) ||
                                    (column.component &&
                                      column.component(row, rowIndex, column, columnIndex)) ||
                                    getDataFromObject(row, column.input)}
                                </TableCell>
                              ))}
                          {isWithTableActions && tableActionsOptions && (
                            <TableCell
                              key={`bodyActionsColumn${rowIndex + 1}`}
                              className={`actions-cell-wrapper ${
                                tableActionsOptions.cellClasses || ''
                              }`}
                            >
                              {(tableActionsOptions.component &&
                                tableActionsOptions.component(row, rowIndex)) ||
                                (tableActions &&
                                  tableActions.map((item) => (
                                    <ButtonBase
                                      disabled={
                                        (tableActionsOptions &&
                                          tableActionsOptions.getDisabledAction &&
                                          tableActionsOptions.getDisabledAction(
                                            row,
                                            rowIndex,
                                            item,
                                          )) ||
                                        isDisabledActions
                                      }
                                      onClick={onActionClickedHandler(item, row, rowIndex)}
                                      key={`${item.key}-${rowIndex + 1}`}
                                      className={`btns mx-1 theme-solid ${item.bgColor || ''}`}
                                    >
                                      <span className={item.icon} />
                                      {item.value}
                                    </ButtonBase>
                                  ))) ||
                                null}
                            </TableCell>
                          )}
                        </TableRow>
                      </React.Fragment>
                    );
                  },
                )}
              </TableBody>
            )}
            {footerData && footerData.length > 0 && (
              <TableFooter className='footer-wrapper'>
                <TableRow>
                  {footerData.map((item, index) => (
                    <TableCell colSpan={item.colSpan} key={`footerCell${index + 1}`}>
                      {(item.component && item.component(item, index)) || item.value}
                    </TableCell>
                  ))}
                </TableRow>
              </TableFooter>
            )}
          </Table>
        </TableContainer>

        {!isOriginalPagination && (onPageIndexChanged || onPageSizeChanged) && <>Pagination</>}
      </div>
    );
  },
);

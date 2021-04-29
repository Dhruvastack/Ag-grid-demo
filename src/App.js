import React, { useState, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import Second from './Second';
const App = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/row-data.json')
      .then(result => result.json())
      .then(rowData => setRowData(rowData))
  }, []);

  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: 900 }}>
<p>Almost all the editing ,drag,pagination ,filtering etc properties </p>
      <AgGridReact
        autoGroupColumnDef={{
          headerName: 'Group',
          minWidth: 170,
          field: 'athlete',
          valueGetter: function (params) {
            if (params.node.group) {
              return params.node.key;
            } else {
              return params.data[params.colDef.field];
            }
          },
          headerCheckboxSelection: true,
          cellRenderer: 'agGroupCellRenderer',
          cellRendererParams: { checkbox: true },
        }}
        defaultColDef={{
          editable: true,
          enableRowGroup: true,
          enablePivot: true,
          enableValue: true,
          sortable: true,
          resizable: true,
          filter: true,
          flex: 1,
          minWidth: 100,
        }}
        suppressRowClickSelection={true}
        groupSelectsChildren={true}
        debug={true}
        rowSelection={'multiple'}
        rowGroupPanelShow={'always'}
        pivotPanelShow={'always'}
        enableRangeSelection={true}
        pagination={true}
        paginationPageSize={10}
        paginationAutoPageSize={true}
        paginationNumberFormatter={function (params) {
          return '[' + params.value.toLocaleString() + ']';
        }}
        onGridReady={onGridReady}
        rowData={rowData}

      >
        <AgGridColumn field="make" sortable={true} filter={true} checkboxSelection={true}></AgGridColumn>
        <AgGridColumn field="model" sortable={true} filter={true}></AgGridColumn>
        <AgGridColumn field="price" sortable={true} filter={true}></AgGridColumn>
      </AgGridReact>
      <p>Other Customized Table</p>
      <Second />
    </div>
  );
};

export default App;
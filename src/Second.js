import React, { useState } from 'react';
import { AgGridReact, AgGridColumn } from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';

const Second = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const updateData = (data) => {
      setRowData(data);
    };

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div
        id="myGrid"
        style={{
          height: '100%',
          width: '100%',
        }}
        className="ag-theme-alpine"
      >
        <AgGridReact
          modules={AllCommunityModules}
          defaultColDef={{
            flex: 1,
            minWidth: 100,
            editable: true,
          }}
          enterMovesDown={true}
          enterMovesDownAfterEdit={true}
          onGridReady={onGridReady}
          rowData={rowData}
        >
          <AgGridColumn field="athlete" minWidth={160} />
          <AgGridColumn field="age" />
          <AgGridColumn field="country" minWidth={140} />
          <AgGridColumn field="year" />
          <AgGridColumn field="date" minWidth={140} />
          <AgGridColumn field="sport" minWidth={160} />
          <AgGridColumn field="gold" />
          <AgGridColumn field="silver" />
          <AgGridColumn field="bronze" />
          <AgGridColumn field="total" />
        </AgGridReact>
      </div>
    </div>
  );
};
export default Second;
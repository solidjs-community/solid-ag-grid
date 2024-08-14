import { Component } from "solid-js";
import AgGridSolid from "@warrenbhw/solid-ag-grid";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";

const AgGridSample: Component = () => {
  const columnDefs = [
    { headerName: "Make", field: "make" },
    { headerName: "Model", field: "model" },
    { headerName: "Price", field: "price" },
  ];

  const rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
  ];

  return (
    <div class="ag-theme-alpine" style="height: 400px; width: 600px;">
      <AgGridSolid columnDefs={columnDefs} rowData={rowData}/>
    </div>
  );
};

export default AgGridSample;

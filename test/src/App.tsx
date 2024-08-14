import { Component } from "solid-js";
import AgGridSample from "./AgGridSample";
import {isEven} from "@warrenbhw/solid-ag-grid";

const App: Component = () => {
  return (
    <div>
      <h1>isEven(10) = {isEven(10)}</h1>
      <h1>Sample SolidJS App using snowpilot-solid-ag-grid</h1>
      <AgGridSample />
    </div>
  );
};

export default App;

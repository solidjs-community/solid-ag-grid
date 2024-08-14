import AgGridSolid from "./grid/agGridSolid";
export default AgGridSolid;

export * from "./grid/agGridSolid";

// Just for basic keepalive testing
export function isEven(n: number) {
  return n % 2 === 0;
}

// /* @refresh reload */
// import { render } from 'solid-js/web';
//
// import './index.css';
// import App from './sampleApp/App';
//
// render(() => <App />, document.getElementById('root') as HTMLElement);
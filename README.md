# Snowpilot Solid AG Grid

## Description

This is a SolidJS component for AG Grid.

## Installation

### Prerequisites

Ensure you have `bun` installed. If not, you can install it from [Bun's official website](https://bun.sh/).

### Install Dependencies

To install the project dependencies, run:

```bash
bun install
```

### Building the Library

To build the library, run:

```bash
bun run build
```

This command will clean previous build artifacts and build the library using `tsup` and `gulp`.

## Running the Example App

We have included an example SolidJS app to demonstrate the usage of the `snowpilot-solid-ag-grid` library.

### 1. Link the Local Library

First, navigate to the root directory of your `snowpilot-solid-ag-grid` library:

```bash
bun link
```

Then, navigate to the `example` directory and link the local `snowpilot-solid-ag-grid`:

```bash
cd example
bun link snowpilot-solid-ag-grid
```

### 2. Install Dependencies

Inside the `example` directory, install the dependencies:

```bash
bun install
```

### 3. Run the Example App

**Link the local library**

First, navigate to the root directory of your `snowpilot-solid-ag-grid` library:

```bash
bun link
```

Then, navigate to the `example` directory and link the local `snowpilot-solid-ag-grid`:

```bash
cd example
bun link snowpilot-solid-ag-grid
```

**Install dependencies**

Inside the `example` directory, install the dependencies:

```bash
bun install
```

**Run the example app**

To start the development server for the example app, run:

```bash
bun run dev
```

This will start a local development server, and you can view the example app at the URL specified in the output.

## Using the Library

Here is a quick guide on how to use `snowpilot-solid-ag-grid` in a SolidJS application.

### Import the Grid and Styles

First, import the necessary components and styles:

```tsx
import type { Component } from "solid-js";
import { AgGridReact } from "snowpilot-solid-ag-grid";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
```

### Render the Grid

Then, render the grid as a child component:

```tsx
const App: Component = () => {
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
      <AgGridReact columnDefs={columnDefs} rowData={rowData}></AgGridReact>
    </div>
  );
};

export default App;
```

## License

This project is licensed under the MIT license. See the [LICENSE file](./LICENSE.txt) for more info.

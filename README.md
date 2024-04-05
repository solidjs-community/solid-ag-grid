<p>
  <img width="100%" src="https://assets.solidjs.com/banner?background=tiles&project=solid-ag-grid" alt="solid-ag-grid">
</p>

AG Grid Solid Component
------

Solid AG Grid is a fully-featured and highly customizable JavaScript data grid.
It delivers [outstanding performance](https://www.ag-grid.com/example?utm_source=solid-ag-grid-readme&utm_medium=repository&utm_campaign=github#/performance/1), has no 3rd party dependencies and integrates smoothly with Solid as Solid Component. Here's how our grid looks like with multiple filters and grouping enabled:

![Image of AG Grid showing filtering and grouping enabled.](./github-grid-demo.jpg "AG Grid demo")

Features
--------------

Besides the standard set of features you'd expect from any grid:

* Column Interactions (resize, reorder, and pin columns)
* Pagination
* Sorting
* Row Selection

Here are some of the features that make AG Grid stand out:

* Grouping / Aggregation *
* Accessibility support
* Custom Filtering
* In-place Cell Editing
* Records Lazy Loading *
* Server-Side Records Operations *
* Live Stream Updates
* Hierarchical Data Support & Tree View *
* Customizable Appearance
* Customizable Cell Contents
* State Persistence
* Keyboard Navigation
* Data Export to CSV
* Data Export to Excel *
* Excel-like Pivoting *
* Row Reordering
* Copy / Paste
* Column Spanning
* Pinned Rows
* Full Width Rows
* Integrated Charting
* Sparklines

\* The features marked with an asterisk are available in the [enterprise version](https://www.ag-grid.com/license-pricing?utm_source=solid-ag-gridct-readme&utm_medium=repository&utm_campaign=github) only.

Check out [developers documentation](https://www.ag-grid.com/react-data-grid/solidjs/) for a complete list of features or visit [our official docs](https://www.ag-grid.com/features-overview?utm_source=solid-ag-grid-readme&utm_medium=repository&utm_campaign=github) for tutorials and feature demos.

Usage Overview
--------------

Use the setup instructions below or go through [a 5-minute-quickstart guide](https://www.ag-grid.com/react-grid?utm_source=ag-grid-react-readme&utm_medium=repository&utm_campaign=github).

#### Install dependencies

    $ npm i --save ag-grid-community solid-ag-grid

#### Import the grid and styles

    import type { Component } from 'solid-js';
    import AgGridSolid from 'ag-grid-solid';
    
    import 'ag-grid-community/styles/ag-grid.css';
    import 'ag-grid-community/styles/ag-theme-alpine.css';

### Render the grid as the `AgGridSolid` child component

    const App: Component = () => {
        const columnDefs = [
            { field: 'make' },
            { field: 'model' },
            { field: 'price' },
        ];
        const rowData = [
            { make: 'Toyota', model: 'Celica', price: 35000 },
            { make: 'Ford', model: 'Mondeo', price: 32000 },
            { make: 'Porsche', model: 'Boxster', price: 72000 },
        ];
        const defaultColDef = {
            flex: 1,
        };
        return (
            <div class="ag-theme-alpine" style={{ height: '100%' }}>
                <AgGridSolid
                    columnDefs={columnDefs}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                />
            </div>
        );
    };

    export default App;

Contributing
------------
AG Grid is developed by a team of co-located developers in London. If you want to join the team check out our [jobs listing](https://www.ag-grid.com/ag-grid-jobs-board?utm_source=solid-ag-grid-readme&utm_medium=repository&utm_campaign=github) or send your application to info@ag-grid.com.

License
------------------
This project is licensed under the MIT license. See the [LICENSE file](./LICENSE.txt) for more info.

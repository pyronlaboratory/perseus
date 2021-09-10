import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

// react testing
import { render, cleanup, fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import user from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';


// Material-UI X DataGrid doesn't allow its child components to render outside of the parent component.
// To avoid the following error while testing, import { DataGrid } from '@mui/x-data-grid'

// Error:
//   Material-UI X: Could not find the data grid context.
//   It looks like you rendered your component outside of a DataGrid or DataGridPro parent component.
//   This can also happen if you are bundling multiple versions of the data grid.

import { DataGrid } from '@mui/x-data-grid';
import SearchToolbar from './../SearchToolbar';

afterEach(cleanup);

describe('search toolbar component', () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        const mockData = {
            rows: [
                {"id":"1", "name":"Randy Marsh"}
            ],
            columns: [
                {
                    headerName: "ID", 
                    field: "id", 
                },
                {
                    headerName: "Name",
                    field: "name"
                }
            ],
            searchText: "Randy"
        }
        ReactDOM.render(
            <Fragment>
                <DataGrid
                    components={{ Toolbar: SearchToolbar }}
                    rows={mockData.rows}
                    columns={mockData.columns}
                    componentsProps={{
                    toolbar: {
                        value: mockData.searchText,
                        onChange: (event) => requestSearch(event.target.value),
                        clearSearch: () => requestSearch(''),
                    },
                    }}
                />
            </Fragment> ,div);
    })

    it('is able to handle onChange events without failing', () => {
        const onChangeMock = jest.fn();
        const clearSearchMock = jest.fn();
        
        const mockData = {
            rows: [
                {"id":"1", "name":"Randy Marsh"}
            ],
            columns: [
                {
                    headerName: "ID", 
                    field: "id", 
                },
                {
                    headerName: "Name",
                    field: "name"
                }
            ],
            searchText: "Randy"
        }   
        render(
            <Fragment>
            <DataGrid
                components={{ Toolbar: SearchToolbar }}
                rows={mockData.rows}
                columns={mockData.columns}
                componentsProps={{
                toolbar: {
                    value: mockData.searchText,
                    onChange: (event) => onChangeMock(event.target.value),
                    clearSearch: () => requestSearch(''),
                },
                }}
            />
            </Fragment>
        );

        const input = screen.getByRole('textbox');
                
        user.type(input, mockData.searchText)
        expect(onChangeMock).toHaveBeenCalledTimes(5);

    });

    it('is able to clear queries without failing', () => {
        const onChangeMock = jest.fn();
        const clearSearchMock = jest.fn();
        
        const mockData = {
            rows: [
                {"id":"1", "name":"Randy Marsh"}
            ],
            columns: [
                {
                    headerName: "ID", 
                    field: "id", 
                },
                {
                    headerName: "Name",
                    field: "name"
                }
            ],
            searchText: "Randy"
        }   
        
        const { getByTestId } = render(
            <Fragment>
            <DataGrid
                components={{ Toolbar: SearchToolbar }}
                rows={mockData.rows}
                columns={mockData.columns}
                componentsProps={{
                toolbar: {
                    value: mockData.searchText,
                    onChange: (event) => onChangeMock(event.target.value),
                    clearSearch: () => clearSearchMock(''),
                },
                }}
            />
            </Fragment>
        );

        const input = screen.getByRole('textbox');
        
        user.type(input, mockData.searchText);
        expect(onChangeMock).toHaveBeenCalledTimes(5);
        
        const clear = getByTestId('clear-search-button');
        
        fireEvent.click(clear);
        expect(input).toHaveTextContent('');

    });

    it("matches snapshot", () => {
        const mockData = {
            rows: [
                {"id":"1", "name":"Randy Marsh"}
            ],
            columns: [
                {
                    headerName: "ID", 
                    field: "id", 
                },
                {
                    headerName: "Name",
                    field: "name"
                }
            ],
            searchText: "Randy"
        }
        const tree = renderer.create(
            <Fragment>
                <DataGrid
                    components={{ Toolbar: SearchToolbar }}
                    rows={mockData.rows}
                    columns={mockData.columns}
                    componentsProps={{
                    toolbar: {
                        value: mockData.searchText,
                        onChange: (event) => requestSearch(event.target.value),
                        clearSearch: () => requestSearch(''),
                    },
                    }}
                />
            </Fragment>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
});


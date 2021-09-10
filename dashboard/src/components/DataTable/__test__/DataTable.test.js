import React from 'react';
import ReactDOM from 'react-dom';

// react testing
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';

import DataTable from './../DataTable';

afterEach(cleanup);

describe('data table component', () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<DataTable />, div);
    })

    it("matches snapshot", () => {
        const tree = renderer.create(<DataTable  />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
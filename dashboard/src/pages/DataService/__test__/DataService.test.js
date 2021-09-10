import React from 'react';
import ReactDOM from 'react-dom';

// react testing
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';

import DataService from './../DataService';

afterEach(cleanup);

describe('data service page', () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<DataService />, div);
    })

    it("matches snapshot", () => {
        const tree = renderer.create(<DataService />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

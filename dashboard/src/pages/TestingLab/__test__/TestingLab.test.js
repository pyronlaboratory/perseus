import React from 'react';
import ReactDOM from 'react-dom';

// react testing
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';

import TestingLab from './../TestingLab';

afterEach(cleanup);

describe('testing labs page', () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<TestingLab />, div);
    })

    it("matches snapshot", () => {
        const tree = renderer.create(<TestingLab />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

import React from 'react';
import ReactDOM from 'react-dom';

// react testing
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';

import Containerization from './../Containerization';

afterEach(cleanup);

describe('containerization page', () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Containerization />, div);
    })

    it("matches snapshot", () => {
        const tree = renderer.create(<Containerization />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
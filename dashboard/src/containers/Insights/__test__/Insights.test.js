import React from 'react';
import ReactDOM from 'react-dom';

// react testing
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';

import Insights from './../Insights';

afterEach(cleanup);

describe('insights container', () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Insights />, div);
    })

    it("matches snapshot", () => {
        const tree = renderer.create(<Insights />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
import React from 'react';
import ReactDOM from 'react-dom';

// react testing
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';

import References from '../References';

afterEach(cleanup);

describe('references page', () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<References />, div);
    })

    it("matches snapshot", () => {
        const tree = renderer.create(<References />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

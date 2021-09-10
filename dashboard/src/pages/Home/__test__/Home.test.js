import React from 'react';
import ReactDOM from 'react-dom';

// react testing
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';

import Home from './../Home';

afterEach(cleanup);

describe('home page', () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Home />, div);
    })

    it("matches snapshot", () => {
        const tree = renderer.create(<Home />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

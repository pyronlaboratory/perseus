import React from 'react';
import ReactDOM from 'react-dom';

// react testing
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';

import Header from './../Header';

afterEach(cleanup);

describe('header container', () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        const onDrawerToggleMock = jest.fn();
        ReactDOM.render(
            <Header onDrawerToggle={onDrawerToggleMock} />
        , div);
    })

    it("matches snapshot", () => {
        const onDrawerToggleMock = jest.fn()
        const tree = renderer.create(<Header onDrawerToggle={onDrawerToggleMock} />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
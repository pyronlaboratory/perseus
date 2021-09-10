import React from 'react';
import ReactDOM from 'react-dom';

// react testing
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';

import Navigator from './../Navigator';
import { BrowserRouter as Router } from "react-router-dom";

afterEach(cleanup);

describe('navigator container', () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");

        ReactDOM.render(
            <Router>
                <Navigator /> 
            </Router>
            , div);
    })

    it("matches snapshot", () => {
        const tree = renderer.create(
            <Router>
                <Navigator /> 
            </Router>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
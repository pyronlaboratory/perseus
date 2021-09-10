import React from 'react';
import ReactDOM from 'react-dom';

// react testing
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Dashboard from './../Dashboard';
import { BrowserRouter as Router } from "react-router-dom";

afterEach(cleanup);

describe('dashboard container', () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");

        ReactDOM.render(
            <Router>
                <Dashboard /> 
            </Router> 
        , div);
    })
});
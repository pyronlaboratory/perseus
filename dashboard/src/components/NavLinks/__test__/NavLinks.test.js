import React from 'react';
import ReactDOM from 'react-dom';

// react testing
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';

import NavLinks from './../NavLinks';
import { BrowserRouter as Router } from "react-router-dom";

afterEach(cleanup);

describe('nav link component', () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        const mockItem = {
            id: "id",
            icon: "icon",
            url: "url"
        }
        ReactDOM.render(
            <Router>
                <NavLinks key={mockItem.id} item={mockItem}/> 
            </Router>
            , div);
    })

    it("matches snapshot", () => {
        const mockItem = {
            id: "id",
            icon: "icon",
            url: "url"
        }
        const tree = renderer.create(
            <Router>
                <NavLinks key={mockItem.id} item={mockItem}/> 
            </Router>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
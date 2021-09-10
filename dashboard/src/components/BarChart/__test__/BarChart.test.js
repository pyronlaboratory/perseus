import React from 'react';
import ReactDOM from 'react-dom';

// react testing
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';

import BarChart from './../BarChart';

afterEach(cleanup);

describe('bar chart component', () => {
    it("renders without crashing", () => {
        const mockData = {
            data: [
                {"month": "string", "total_number_of_users": 0},
                {"month": "string", "total_number_of_users": 0}
            ],
            options: "chart options"
        }
        const div = document.createElement("div");
        ReactDOM.render(<BarChart data={mockData.data} options={mockData.options}/>, div);
    })

    it("matches snapshot", () => {
        const mockData = {
            data: [
                {"month": "string", "total_number_of_users": 0},
                {"month": "string", "total_number_of_users": 0}
            ],
            options: "chart options"
        }

        const tree = renderer.create(<BarChart data={mockData.data} options={mockData.options} />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
import React from 'react';
import ReactDOM from 'react-dom';

// react testing
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';

import DoughnutChart from './../DoughnutChart';

afterEach(cleanup);

describe('doughnnut chart component', () => {
    it("renders without crashing", () => {
        const mockData = {
            data: [
                {"month": "string", "total_number_of_users": 0},
                {"month": "string", "total_number_of_users": 0}
            ],
            options: "chart options"
        }
        const div = document.createElement("div");
        ReactDOM.render(<DoughnutChart data={mockData.data} options={mockData.options}/>, div);
    })

    it("matches snapshot", () => {
        const mockData = {
            data: [
                {"month": "string", "total_number_of_users": 0},
                {"month": "string", "total_number_of_users": 0}
            ],
            options: "chart options"
        }

        const tree = renderer.create(<DoughnutChart data={mockData.data} options={mockData.options} />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
import React from 'react';
import ReactDOM from 'react-dom';

// react testing
import { render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';

import StatisticsCard from './../StatisticsCard';

afterEach(cleanup);

describe('statistics card component', () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<StatisticsCard/>, div);
    })

    it("renders statistics card correctly", () => {
        const mockData = {
            title: "Fastest user to complete a course",
            value: "Marsh, Randy"
        }
        const { getByTestId } = render(<StatisticsCard title={mockData.title} value={mockData.value} />)
        expect(getByTestId('statistics-card')).toHaveTextContent("Marsh, Randy");
    })

    it("matches snapshot", () => {
        const mockData = {
            title: "Fastest user to complete a course",
            value: "Marsh, Randy"
        }

        const tree = renderer.create(<StatisticsCard title={mockData.title} value={mockData.value} />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
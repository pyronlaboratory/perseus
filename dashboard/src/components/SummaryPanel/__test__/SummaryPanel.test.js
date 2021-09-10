import React from 'react';
import ReactDOM from 'react-dom';

// react testing
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';

import SummaryPanel from './../SummaryPanel';

afterEach(cleanup);

describe('summary panel component', () => {
    it("renders without crashing", () => {
        const mockData = {
            fastestSubmissions: [{"Name":"Randy Marsh"}],
            titleKey: "Tegridy Farms",
            subHeader: "Sales",
            key: 0
        }
        const div = document.createElement("div");
        ReactDOM.render(<SummaryPanel key={mockData.key} data={mockData.fastestSubmissions} titleKey={mockData.titleKey} subHeader={mockData.subHeader}/>, div);
    })

    it("matches snapshot", () => {
        const mockData = {
            fastestSubmissions: [{"Name":"Randy Marsh"}],
            titleKey: "Tegridy Farms",
            subHeader: "Sales"
        }

        const tree = renderer.create(<SummaryPanel key={mockData.key} data={mockData.fastestSubmissions} titleKey={mockData.titleKey} subHeader={mockData.subHeader} />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
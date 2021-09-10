import React from 'react'
import { Switch, Redirect, Route } from "react-router-dom";

// Page components for dashboard
import Home from './pages/Home/Home';

// Page components for documentation only -- static
import Containerization from './pages/Containerization/Containerization';
import DataService from './pages/DataService/DataService';
import References from './pages/References/References';
import TestingLab from './pages/TestingLab/TestingLab';

export default function Routes() {
    return (
        <Switch>
            <Route path="/containerization" component={Containerization} />
            <Route path="/data-services" component={DataService} />
            <Route path="/references" component={References} />
            <Route path="/testing-lab" component={TestingLab} />
            <Route exact path="/" component={Home} />
            <Redirect from="*" to='/' />             
        </Switch>
    )
}



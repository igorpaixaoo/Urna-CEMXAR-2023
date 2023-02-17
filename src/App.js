import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Urna from './pages/Urna'
import Mesario from './pages/Mesario'

const App = () =>{
    return(
        <Router>    
            <Switch>
                <Route exact path="/" component={props => <Urna {...props} />}/>
                <Route path="/mesario" component={props => <Mesario {...props} />}/>
            </Switch>
        </Router>
    )
}

export default App;
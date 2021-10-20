import logo from './logo.svg';
import Nav from './Nav';
import './App.css';
import Calculator from './Calculator'
import QuaterCalculator from './QuaterCalculator'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Link } from "react-router-dom";

function App() {
  return (
    <Router>
    <Nav />
        <div className="App">
          <Switch>
          <Route path="/" exact component={Calculator} />
          <Route path="/quater" component={QuaterCalculator} />
          </Switch>
        </div>
    </Router>
  );
}

export default App;

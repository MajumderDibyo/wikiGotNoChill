import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
//import { browserHistory } from 'react-router';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <HomePage />
        </div>
      </Router>
    )
  }
}
export default App;
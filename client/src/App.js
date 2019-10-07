import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

// Components
import Navbar from './page/NavBar';
import Landing from './page/Landing';

// Page
import RegisterPage from './page/RegisterPage';

import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <Route exact path='/register' component={RegisterPage} />
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;

import React from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import './App.css';
import HomePage from './components/Index/HomePage';
import SignIn from './components/Authentication/SignIn';

function App() {
  return (
    <div className="main_container">

      <Router>
        <NavigationBar />
          <Routes>
            <Route path = '/' element = { <HomePage /> }/>
            <Route path = '/sign_in' element = { <SignIn /> }/>
          </Routes>
      </Router>
      

    </div>
  );
}

export default App;
